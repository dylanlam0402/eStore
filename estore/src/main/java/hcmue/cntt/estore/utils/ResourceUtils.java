package hcmue.cntt.estore.utils;


import hcmue.cntt.estore.domain.utils.AppException;

import java.io.*;
import java.net.URLEncoder;
import java.nio.ByteBuffer;
import java.nio.channels.Channels;
import java.nio.channels.FileChannel;
import java.nio.channels.ReadableByteChannel;
import java.nio.channels.WritableByteChannel;
import java.nio.file.Files;
import java.nio.file.StandardOpenOption;

import static java.nio.charset.StandardCharsets.UTF_8;

public class ResourceUtils {
  private static final int DEFAULT_STREAM_BUFFER_SIZE = 10240;

  public static String encodeURL(String string) {
    if (string == null) {
      return null;
    }

    try {
      return URLEncoder.encode(string, UTF_8.name());
    } catch (UnsupportedEncodingException e) {
      throw new AppException(e);
    }
  }

  public static String encodeURI(String string) {
    if (string == null) {
      return null;
    }

    return encodeURL(string)
        .replace("+", "%20")
        .replace("%21", "!")
        .replace("%27", "'")
        .replace("%28", "(")
        .replace("%29", ")")
        .replace("%7E", "~");
  }

  public static long stream(InputStream input, OutputStream output) throws IOException {
    try (ReadableByteChannel inputChannel = Channels.newChannel(input);
         WritableByteChannel outputChannel = Channels.newChannel(output)) {
      ByteBuffer buffer = ByteBuffer.allocateDirect(DEFAULT_STREAM_BUFFER_SIZE);
      long size = 0;

      while (inputChannel.read(buffer) != -1) {
        buffer.flip();
        size += outputChannel.write(buffer);
        buffer.clear();
      }

      return size;
    }
  }

  public static long stream(File file, OutputStream output, long start, long length) throws IOException {
    if (start == 0 && length >= file.length()) {
      return stream(new FileInputStream(file), output);
    }

    try (FileChannel fileChannel = (FileChannel) Files.newByteChannel(file.toPath(), StandardOpenOption.READ);
         WritableByteChannel outputChannel = Channels.newChannel(output)) {
      ByteBuffer buffer = ByteBuffer.allocateDirect(DEFAULT_STREAM_BUFFER_SIZE);
      long size = 0;

      while (fileChannel.read(buffer, start + size) != -1) {
        buffer.flip();

        if (size + buffer.limit() > length) {
          buffer.limit((int) (length - size));
        }

        size += outputChannel.write(buffer);

        if (size >= length) {
          break;
        }

        buffer.clear();
      }

      return size;
    }
  }
}
