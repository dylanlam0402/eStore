package hcmue.cntt.estore.service.dto;


import lombok.Data;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
public class ErrorDto {
  private final String code;
  private final String message;
  private final List<FieldError> details = new ArrayList<>();

  public ErrorDto(String code) {
    this(code, null);
  }

  public ErrorDto(String code, String message) {
    this.code = code;
    this.message = message;
  }

  public void addFieldError(String field, String message) {
      details.add(new FieldError(field, message));
  }

  @Data
  public class FieldError implements Serializable {
    private final String field;
    private final String message;
  }
}
