package hcmue.cntt.estore.infras.security;

import hcmue.cntt.estore.config.AppProperties;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;


import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.Instant;
import java.util.Date;

@Component
public class TokenHelper {
    public final static String TOKEN_PREFIX = "Bearer ";

    private static final SignatureAlgorithm SIGNATURE_ALGORITHM = SignatureAlgorithm.HS512;

    @Value("#{appProperties.apiInfo}")
    private AppProperties.ApiInfo apiInfo;

    @Value("#{appProperties.jwtConfig}")
    private AppProperties.JwtConfig jwtConfig;

    public String getTokenFromHeader(HttpServletRequest request) {
        // Get the token from Cookie store if configured
        if (StringUtils.hasText(jwtConfig.getCookieName())) {
            Cookie authCookie = getCookieValueByName(request, jwtConfig.getCookieName());
            if (authCookie != null) {
                return authCookie.getValue();
            }
        }

        // Get the token from HTTP header, e.g Authentication: Bearer your_token
        String token = request.getHeader(jwtConfig.getHeaderName());
        if (token != null && token.startsWith(TOKEN_PREFIX)) {
            token = token.substring(7);
        }

        return token;
    }

    public TokenInfo setTokenToHeader(HttpServletResponse response, String username, Boolean rememberMe) {
        long currentTime = Instant.now().toEpochMilli();
        int expiry = (rememberMe != null && rememberMe)? jwtConfig.getRemembermeIn() : jwtConfig.getExpiresIn();

        String token = Jwts.builder()
            .setIssuer(apiInfo.getTitle())
            .setSubject(username)
            .setIssuedAt(new Date(currentTime))
            .setExpiration(new Date(currentTime + expiry * 1000))
            .signWith(SIGNATURE_ALGORITHM, jwtConfig.getSecretKey())
            .compact();

        // Add token to cooke if configured
        if (StringUtils.hasText(jwtConfig.getCookieName())) {
            Cookie authCookie = new Cookie(jwtConfig.getCookieName(), token);
            authCookie.setPath("/");
            authCookie.setHttpOnly(true);
            authCookie.setMaxAge(jwtConfig.getExpiresIn());

            response.addCookie(authCookie);
        }

        // Add token to header
        String jwt = TOKEN_PREFIX + token;
        response.setHeader(jwtConfig.getHeaderName(), jwt);

        return new TokenInfo(token, expiry);
    }

    public String getUsernameFromToken(String token) {
        String username;
        try {
            final Claims claims = getClaimsFromToken(token);
            username = claims.getSubject();
        } catch (Exception e) {
            username = null;
        }
        return username;
    }

    private Claims getClaimsFromToken(String token) {
        Claims claims;
        try {
            claims = Jwts.parser()
                .setSigningKey(jwtConfig.getSecretKey())
                .parseClaimsJws(token)
                .getBody();
        } catch (Exception e) {
            claims = null;
        }
        return claims;
    }

    private Cookie getCookieValueByName(HttpServletRequest request, String name) {
        if (request.getCookies() == null) {
            return null;
        }

        for (int i = 0; i < request.getCookies().length; i++) {
            if (request.getCookies()[i].getName().equals(name)) {
                return request.getCookies()[i];
            }
        }
        return null;
    }
}
