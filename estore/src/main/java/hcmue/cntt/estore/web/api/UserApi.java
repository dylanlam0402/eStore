package hcmue.cntt.estore.web.api;

import hcmue.cntt.estore.service.UserService;
import hcmue.cntt.estore.service.dto.ResultDto;
import hcmue.cntt.estore.service.dto.UserInfoDto;
import hcmue.cntt.estore.service.dto.UserRegistrationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserApi {
    @Autowired
    private UserService userService;

    @PostMapping
    public void registerUser(@Valid @RequestBody UserRegistrationDto userRegistrationDto) {
        userService.registerUser(userRegistrationDto);
    }

    @GetMapping
    public ResultDto<List<UserInfoDto>> getAllUsers() {

        return userService.getAllUsers();
    }
}
