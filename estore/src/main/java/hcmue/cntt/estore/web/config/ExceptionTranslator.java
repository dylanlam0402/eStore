package hcmue.cntt.estore.web.config;

import hcmue.cntt.estore.domain.utils.DataInvalidException;
import hcmue.cntt.estore.domain.utils.DataNotFoundException;
import hcmue.cntt.estore.service.dto.ErrorDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.dao.ConcurrencyFailureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;

@ControllerAdvice
@Slf4j
public class ExceptionTranslator {
  public static final String ERR_CONCURRENCY_FAILURE = "concurrency-failure";
  public static final String ERR_ACCESS_DENIED = "access-denied";
  public static final String ERR_VALIDATION = "invalid-data";
  public static final String ERR_NOT_FOUND = "data-not-found";
  public static final String ERR_NOT_SUPPORTED = "not-supported";
  public static final String ERR_SERVER_ERROR = "server-error";
  public static final String ERROR_UNAUTHORIZED = "unauthorized";

  @ExceptionHandler(ConcurrencyFailureException.class)
  @ResponseStatus(HttpStatus.CONFLICT)
  @ResponseBody
  public ErrorDto handleConcurencyError(ConcurrencyFailureException ex) {
    return new ErrorDto(ERR_CONCURRENCY_FAILURE, ex.getMessage());
  }

  @ExceptionHandler({MethodArgumentNotValidException.class, BindException.class})
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ResponseBody
  public ErrorDto handleValidationError(Exception ex) {
    BindingResult result;
    if (ex instanceof MethodArgumentNotValidException) {
        result = ((MethodArgumentNotValidException) ex).getBindingResult();
    } else {
        result = (BindingResult) ex;
    }

    List<FieldError> fieldErrors = result.getFieldErrors();

    return handleFieldErrors(fieldErrors);
  }

  @ExceptionHandler(DataInvalidException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ResponseBody
  public ErrorDto handleInvalidDataException(DataInvalidException ex) {
    return new ErrorDto(ERR_VALIDATION, ex.getMessage());
  }

  @ExceptionHandler(DataNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  @ResponseBody
  public ErrorDto handleNotFoundDataException(DataNotFoundException ex) {
    return new ErrorDto(ERR_NOT_FOUND, ex.getMessage());
  }

  @ExceptionHandler(AccessDeniedException.class)
  @ResponseStatus(HttpStatus.FORBIDDEN)
  @ResponseBody
  public ErrorDto handleAccessDeniedException(AccessDeniedException e) {
    return new ErrorDto(ERR_ACCESS_DENIED, e.getMessage());
  }

  @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
  @ResponseBody
  @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
  public ErrorDto handleMethodNotSupportedException(HttpRequestMethodNotSupportedException exception) {
    return new ErrorDto(ERR_NOT_SUPPORTED, exception.getMessage());
  }

    @ExceptionHandler(BadCredentialsException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorDto handleBadCredentialsException(BadCredentialsException exception) {
        return new ErrorDto(ERROR_UNAUTHORIZED, exception.getMessage());
    }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ErrorDto> processRuntimeException(Exception ex) {
    log.error("Unexpected error!", ex);

    ResponseEntity.BodyBuilder builder;
    ErrorDto error;
    ResponseStatus responseStatus = AnnotationUtils.findAnnotation(ex.getClass(), ResponseStatus.class);
    if (responseStatus != null) {
      builder = ResponseEntity.status(responseStatus.value());
      error = new ErrorDto("error-" + responseStatus.value().value(), responseStatus.reason());
    } else {
      builder = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR);
      error = new ErrorDto(ERR_SERVER_ERROR, ex.getMessage());
    }
    return builder.body(error);
  }

  private ErrorDto handleFieldErrors(List<FieldError> fieldErrors) {
    ErrorDto error = new ErrorDto(ERR_VALIDATION, "validation failed");

    for (FieldError fieldError : fieldErrors) {
      error.addFieldError(fieldError.getField(), fieldError.getDefaultMessage());
    }

    return error;
  }
}
