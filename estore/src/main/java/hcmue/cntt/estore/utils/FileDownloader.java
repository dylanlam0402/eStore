package hcmue.cntt.estore.utils;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.TimeUnit;
import java.util.regex.Pattern;

import static java.util.concurrent.TimeUnit.SECONDS;
import static java.util.regex.Pattern.matches;

/**
 * From https://github.com/omnifaces/omnifaces/blob/2.5.1/src/main/java/org/omnifaces/servlet/FileServlet.java
 */
public class FileDownloader {
  private static final Long DEFAULT_EXPIRE_TIME_IN_SECONDS = TimeUnit.DAYS.toSeconds(30);
  private static final long ONE_SECOND_IN_MILLIS = SECONDS.toMillis(1);
  private static final String ETAG = "W/\"%s-%s\"";
  private static final Pattern RANGE_PATTERN = Pattern.compile("^bytes=[0-9]*-[0-9]*(,[0-9]*-[0-9]*)*$");
  private static final String CONTENT_DISPOSITION_HEADER = "%s;filename=\"%2$s\"; filename*=UTF-8''%2$s";
  private static final String MULTIPART_BOUNDARY = UUID.randomUUID().toString();

  public void doRequest(HttpServletRequest request, HttpServletResponse response, File file) throws IOException {
    response.reset();
    Resource resource;

    try {
      resource = new Resource(file);
    } catch (IllegalArgumentException e) {
      response.sendError(HttpServletResponse.SC_BAD_REQUEST);
      return;
    }

    if (resource.file == null) {
      handleFileNotFound(response);
      return;
    }

    if (preconditionFailed(request, resource)) {
      response.sendError(HttpServletResponse.SC_PRECONDITION_FAILED);
      return;
    }

    setCacheHeaders(response, resource, getExpireTime());

    if (notModified(request, resource)) {
      response.setStatus(HttpServletResponse.SC_NOT_MODIFIED);
      return;
    }

    List<Range> ranges = getRanges(request, resource);

    if (ranges == null) {
      response.setHeader("Content-Range", "bytes */" + resource.length);
      response.sendError(HttpServletResponse.SC_REQUESTED_RANGE_NOT_SATISFIABLE);
      return;
    }

    if (!ranges.isEmpty()) {
      response.setStatus(HttpServletResponse.SC_PARTIAL_CONTENT);
    }
    else {
      ranges.add(new Range(0, resource.length - 1)); // Full content.
    }

    String contentType = setContentHeaders(request, response, resource, ranges);

    if (!"HEAD".equalsIgnoreCase(request.getMethod())) {
      writeContent(response, resource, ranges, contentType);
    }
  }

  protected boolean isAttachment() {
    return false;
  }

  protected String getAttachmentName(File file) {
    return file.getName();
  }

  protected void handleFileNotFound(HttpServletResponse response) throws IOException {
    response.sendError(HttpServletResponse.SC_NOT_FOUND);
  }

  protected long getExpireTime() {
    return DEFAULT_EXPIRE_TIME_IN_SECONDS;
  }

  protected String getContentType(HttpServletRequest request, File file) {
    String contentType = request.getServletContext().getMimeType(file.getName());
    if (contentType == null) {
      contentType = "application/octet-stream";
    }

    return contentType;
  }

  private boolean preconditionFailed(HttpServletRequest request, Resource resource) {
    String match = request.getHeader("If-Match");
    long unmodified = request.getDateHeader("If-Unmodified-Since");
    return (match != null) ? !matches(match, resource.eTag) : (unmodified != -1 && modified(unmodified, resource.lastModified));
  }

  private void setCacheHeaders(HttpServletResponse response, Resource resource, long expires) {
    setCacheHeaders(response, expires);
    response.setHeader("ETag", resource.eTag);
    response.setDateHeader("Last-Modified", resource.lastModified);
  }

  private void setCacheHeaders(HttpServletResponse response, long expires) {
    if (expires > 0) {
      response.setHeader("Cache-Control", "public,max-age=" + expires + ",must-revalidate");
      response.setDateHeader("Expires", System.currentTimeMillis() + SECONDS.toMillis(expires));
      response.setHeader("Pragma", "");
    } else {
      response.setHeader("Cache-Control", "no-cache,no-store,must-revalidate");
      response.setDateHeader("Expires", 0);
      response.setHeader("Pragma", "no-cache");
    }
  }

  private String setContentHeaders(HttpServletRequest request, HttpServletResponse response, Resource resource, List<Range> ranges) {
    String contentType = getContentType(request, resource.file);
    String disposition = isAttachment()? "attachment" : "inline";
    String filename = ResourceUtils.encodeURI(getAttachmentName(resource.file));
    response.setHeader("Content-Disposition", String.format(CONTENT_DISPOSITION_HEADER, disposition, filename));
    response.setHeader("Accept-Ranges", "bytes");

    if (ranges.size() == 1) {
      Range range = ranges.get(0);
      response.setContentType(contentType);
      response.setHeader("Content-Length", String.valueOf(range.length));

      if (response.getStatus() == HttpServletResponse.SC_PARTIAL_CONTENT) {
        response.setHeader("Content-Range", "bytes " + range.start + "-" + range.end + "/" + resource.length);
      }
    }
    else {
      response.setContentType("multipart/byteranges; boundary=" + MULTIPART_BOUNDARY);
    }

    return contentType;
  }

  private void writeContent(HttpServletResponse response, Resource resource, List<Range> ranges, String contentType) throws IOException {
    ServletOutputStream output = response.getOutputStream();

    if (ranges.size() == 1) {
      Range range = ranges.get(0);
      ResourceUtils.stream(resource.file, output, range.start, range.length);
    }
    else {
      for (Range range : ranges) {
        output.println();
        output.println("--" + MULTIPART_BOUNDARY);
        output.println("Content-Type: " + contentType);
        output.println("Content-Range: bytes " + range.start + "-" + range.end + "/" + resource.length);
        ResourceUtils.stream(resource.file, output, range.start, range.length);
      }

      output.println();
      output.println("--" + MULTIPART_BOUNDARY + "--");
    }
  }

  private boolean modified(long modifiedHeader, long lastModified) {
    return (modifiedHeader + ONE_SECOND_IN_MILLIS <= lastModified); // That second is because the header is in seconds, not millis.
  }

  private boolean notModified(HttpServletRequest request, Resource resource) {
    String noMatch = request.getHeader("If-None-Match");
    long modified = request.getDateHeader("If-Modified-Since");
    return (noMatch != null) ? matches(noMatch, resource.eTag) : (modified != -1 && !modified(modified, resource.lastModified));
  }

  private List<Range> getRanges(HttpServletRequest request, Resource resource) {
    List<Range> ranges = new ArrayList<>(1);
    String rangeHeader = request.getHeader("Range");

    if (rangeHeader == null) {
      return ranges;
    }

    if (!RANGE_PATTERN.matcher(rangeHeader).matches()) {
      return null; // Syntax error.
    }

    String ifRange = request.getHeader("If-Range");

    if (ifRange != null && !ifRange.equals(resource.eTag)) {
      try {
        long ifRangeTime = request.getDateHeader("If-Range");

        if (ifRangeTime != -1 && modified(ifRangeTime, resource.lastModified)) {
          return ranges;
        }
      } catch (IllegalArgumentException ifRangeHeaderIsInvalid) {
        return ranges;
      }
    }

    for (String rangeHeaderPart : rangeHeader.split("=")[1].split(",")) {
      Range range = parseRange(rangeHeaderPart, resource.length);

      if (range == null) {
        return null; // Logic error.
      }

      ranges.add(range);
    }

    return ranges;
  }

  private Range parseRange(String range, long length) {
    long start = sublong(range, 0, range.indexOf('-'));
    long end = sublong(range, range.indexOf('-') + 1, range.length());

    if (start == -1) {
      start = length - end;
      end = length - 1;
    }
    else if (end == -1 || end > length - 1) {
      end = length - 1;
    }

    if (start > end) {
      return null; // Logic error.
    }

    return new Range(start, end);
  }

  private long sublong(String value, int beginIndex, int endIndex) {
    String substring = value.substring(beginIndex, endIndex);
    return substring.isEmpty() ? -1 : Long.parseLong(substring);
  }

  private static class Resource {
    private final File file;
    private final long length;
    private final long lastModified;
    private final String eTag;

    public Resource(File file) {
      if (file != null && file.isFile()) {
        this.file = file;
        length = file.length();
        lastModified = file.lastModified();
        eTag = String.format(ETAG, ResourceUtils.encodeURL(file.getName()), lastModified);
      }
      else {
        this.file = null;
        length = 0;
        lastModified = 0;
        eTag = null;
      }
    }

  }

  private static class Range {
    private final long start;
    private final long end;
    private final long length;

    public Range(long start, long end) {
      this.start = start;
      this.end = end;
      length = end - start + 1;
    }

  }
}
