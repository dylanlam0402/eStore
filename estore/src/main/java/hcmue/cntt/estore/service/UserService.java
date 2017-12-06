/*
 * Copyright (c) 2017. KMS Technology, Inc.
 */

package hcmue.cntt.estore.service;

import hcmue.cntt.estore.domain.common.MailingService;
import hcmue.cntt.estore.domain.user.User;
import hcmue.cntt.estore.domain.user.UserRepository;
import hcmue.cntt.estore.domain.user.UserRole;
import hcmue.cntt.estore.service.dto.ResultDto;
import hcmue.cntt.estore.service.dto.UserInfoDto;
import hcmue.cntt.estore.service.dto.UserRegistrationDto;
import hcmue.cntt.estore.utils.BaseReturn;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService extends BaseReturn {
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final MailingService mailingService;

    public UserService(UserRepository userRepo, PasswordEncoder passwordEncoder, MailingService mailingService) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.mailingService = mailingService;
    }

    public void registerUser(UserRegistrationDto userRegistrationDto) {
        User user = new User();
        user.setUsername(userRegistrationDto.getUsername());
        user.setPassword(passwordEncoder.encode(userRegistrationDto.getPassword()));
        user.setFirstName(userRegistrationDto.getFirstName());
        user.setLastName(userRegistrationDto.getLastName());
        user.setEmail(userRegistrationDto.getEmail());

        user.setActivated(true);
        user.setRole(UserRole.USER);

        mailingService.sendEmailAsync("User registered successfully", "Your registration is successful",
            user.getEmail());

        userRepo.save(user);
    }

    public ResultDto<List<UserInfoDto>> getAllUsers() {

        List<UserInfoDto> result = userRepo.findAll().stream()
            .map(UserInfoDto::from)
            .collect(Collectors.toList());
        return Success(result,"Get User Successfully");
    }
}
