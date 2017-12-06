package hcmue.cntt.estore.service.dto;

import lombok.Data;
import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
public class SignInDto {
    @Pattern(regexp = "^[_'.@A-Za-z0-9-]*$")
    @NotEmpty
    @Size(min = 4, max = 32)
    private String username;

    @NotEmpty
    @Size(min = 4, max = 128)
    private String password;

    private Boolean rememberMe;
}
