package hcmue.cntt.estore.service.dto;

import hcmue.cntt.estore.domain.user.User;
import hcmue.cntt.estore.domain.user.UserRole;
import lombok.Data;
import org.springframework.beans.BeanUtils;


@Data
public class UserInfoDto {
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private UserRole role;
    private boolean activated;

    public static UserInfoDto from(User user) {
        if (user == null) {
            return null;
        }

        UserInfoDto dto = new UserInfoDto();
        BeanUtils.copyProperties(user, dto);

        return dto;
    }
}
