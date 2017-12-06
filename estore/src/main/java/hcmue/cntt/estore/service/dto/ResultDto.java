package hcmue.cntt.estore.service.dto;

import lombok.Data;

import java.util.List;

/**
 * @Author KietLam
 */
@Data
public class ResultDto<T> {
    private T data;
    private String message;
    private boolean isSuccess;

    public ResultDto(T data, String message, boolean isSuccess) {
        this.data = data;
        this.message = message;
        this.isSuccess = isSuccess;
    }
    public ResultDto(T data, boolean isSuccess) {
        this.data = data;
        this.message = isSuccess == true ?  "success" : "fail";
        this.isSuccess = isSuccess;
    }



}
