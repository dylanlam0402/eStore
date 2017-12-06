package hcmue.cntt.estore.web.api;

import hcmue.cntt.estore.infras.security.TokenHelper;
import hcmue.cntt.estore.infras.security.TokenInfo;
import hcmue.cntt.estore.service.dto.SignInDto;
import hcmue.cntt.estore.utils.SecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;


import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;

@RestController
@RequestMapping("/api/auth")
public class AuthenApi {
    @Autowired
    private TokenHelper tokenHelper;

    @Autowired
    private AuthenticationManager authenManager;

    @PostMapping(value = "signin" )
    public TokenInfo signin(@Valid @RequestBody SignInDto signInDto, HttpServletResponse response)
        throws IOException, ServletException {

        UsernamePasswordAuthenticationToken authenToken =
            new UsernamePasswordAuthenticationToken(signInDto.getUsername(), signInDto.getPassword());

        Authentication authentication = authenManager.authenticate(authenToken);

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        TokenInfo tokenInfo = tokenHelper.setTokenToHeader(response,
            userDetails.getUsername(), signInDto.getRememberMe());

        return tokenInfo;
    }

    @GetMapping("/current")
    public SecurityUtil.AuthInfo getAuthInfo() {
        return SecurityUtil.getAuthInfo();
    }
}
