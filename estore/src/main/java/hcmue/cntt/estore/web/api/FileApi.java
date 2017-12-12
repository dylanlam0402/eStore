package hcmue.cntt.estore.web.api;

import hcmue.cntt.estore.domain.utils.DataInvalidException;
import hcmue.cntt.estore.service.dto.ResultDto;
import hcmue.cntt.estore.utils.FileDownloader;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

@RestController
@RequestMapping("/api/files")
public class FileApi {
    @Value("#{appProperties.fileStorage}")
    private String storagePath;

    @RequestMapping(path = {"/{name:.*}"}, method = {RequestMethod.HEAD, RequestMethod.GET})
    public void downloadFile(HttpServletRequest request, HttpServletResponse response,
                             @PathVariable String name) throws IOException {

        File serverFile = new File(getStorageDir(), name);

        new FileDownloader().doRequest(request, response, serverFile);
    }

    @PostMapping
    public ResultDto<String> uploadImage(MultipartFile multipart, HttpServletRequest request) throws IOException {
        validateImageFile(multipart);

        String fileName = multipart.getOriginalFilename();


        File serverFile = new File(getStorageDir(), fileName);
        try (OutputStream outputStream = new FileOutputStream(serverFile)) {
            IOUtils.copy(multipart.getInputStream(), outputStream);
        }
        catch (Exception ex){
            return new ResultDto<String>(null, ex.getMessage(),false);
        }


        return new ResultDto<String>(null,"upload successfully",true);
    }

    private void validateImageFile(MultipartFile multipart) throws IOException {
        try (InputStream input = multipart.getInputStream()) {
            try {
                // Only BMP, GIF, JPG and PNG are recognized
                ImageIO.read(input);
            } catch (Exception e) {
                throw new DataInvalidException("Upload file is not an image");
            }
        }
    }

    private File getStorageDir() {
        File storageDir = new File(storagePath);
        if (!storageDir.exists()) {
            storageDir.mkdirs();
            }

        return storageDir;
    }
}
