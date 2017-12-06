package hcmue.cntt.estore.utils;

import hcmue.cntt.estore.service.dto.ResultDto;

import java.util.List;

/**
 * @Author KietLam
 */
public class BaseReturn {
    protected final <T> ResultDto<T> Success(T data, String message) {
        return new ResultDto<T>(data, message, true);
    }

    protected final <T> ResultDto<T> Success(T data) {
        return this.Success(data, "success");
    }

    protected final <T> ResultDto<T> Success(String message) {
        return new ResultDto<T>(null, message, true);
    }

    protected final <T> ResultDto<T> Success() {
        return new ResultDto<T>(null, "success", true);
    }


    protected final <T> ResultDto<T> Fail(T data, String message) {
        return new ResultDto<T>(data, message, false);
    }

    protected final <T> ResultDto<T> Fail(T data) {
        return this.Fail(data, "fail");
    }

    protected final <T> ResultDto<T> Fail(String message) {
        return this.Fail(null, message);
    }
}
