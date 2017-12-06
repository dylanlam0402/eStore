package hcmue.cntt.estore.infras.security;

import io.jsonwebtoken.ExpiredJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class TokenAuthenticationFilter extends OncePerRequestFilter {
    private final TokenHelper tokenHelper;
    private final UserDetailsService userDetailsService;

    public TokenAuthenticationFilter(TokenHelper tokenHelper, UserDetailsService userDetailsService) {
        this.tokenHelper = tokenHelper;
        this.userDetailsService = userDetailsService;
    }

    @Override
    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
        throws IOException, ServletException {

        String authToken = tokenHelper.getTokenFromHeader(request);

        try {
            if (StringUtils.hasText(authToken)) {
                String username = tokenHelper.getUsernameFromToken(authToken);
                try {
                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                    SecurityContextHolder.getContext()
                            .setAuthentication(new TokenBasedAuthentication(authToken, userDetails));
                    chain.doFilter(request, response);
                }
                catch (UsernameNotFoundException ex){
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    log.info("Security exception for user {} - {}", ex.getMessage());
                }
            }

        } catch (ExpiredJwtException ex) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            log.info("Security exception for user {} - {}", ex.getClaims().getSubject(), ex.getMessage());
        }

    }
}
