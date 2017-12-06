package hcmue.cntt.estore.service.dto;

import hcmue.cntt.estore.domain.user.User;
import hcmue.cntt.estore.infras.validation.FieldMatch;
import hcmue.cntt.estore.infras.validation.FieldUnique;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;


import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldMatch(firstField = "password", secondField = "confirmPassword")
public class UserRegistrationDto {
    @Pattern(regexp = "^[_'.@A-Za-z0-9-]*$")
    @NotEmpty
    @Size(min = 4, max = 32)
    private String username;

    @NotEmpty
    @Size(min = 4, max = 128)
    private String password;

    @NotEmpty
    @Size(min = 4, max = 128)
    private String confirmPassword;

    @Email
    @FieldUnique(entity = User.class, field = "email")
    private String email;

    @Size(max = 32)
    private String firstName;

    @Size(max = 32)
    private String lastName;
}
