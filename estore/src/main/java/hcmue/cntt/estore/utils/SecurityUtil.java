package hcmue.cntt.estore.utils;

import hcmue.cntt.estore.domain.user.UserRole;
import hcmue.cntt.estore.infras.security.UserDetailsImpl;
import lombok.Data;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;


public final class SecurityUtil {
    private SecurityUtil() {
    }

    public static String getLogin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            return "anonymous";
        }

        Object principal = authentication.getPrincipal();

        if (principal instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) principal;
            return userDetails.getUsername();
        }

        return authentication.getPrincipal().toString();
    }

    public static boolean isAdminRole() {
        return getRole() == UserRole.ADMIN;
    }

    public static UserRole getRole() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            return UserRole.ANONYMOUS;
        }

        return authentication.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .map(role -> UserRole.valueOf(role.replaceFirst("ROLE_", "")))
            .findFirst()
            .orElse(UserRole.ANONYMOUS);
    }

    public static AuthInfo getAuthInfo() {
        UserRole role = getRole();

        return new AuthInfo(
            getLogin(),
            getDisplayLogin(),
            role,
            role != UserRole.ANONYMOUS
        );
    }

    private static String getDisplayLogin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            return "Anonymous User";
        }

        Object principal = authentication.getPrincipal();

        if (principal instanceof UserDetailsImpl) {
            UserDetailsImpl userDetails = (UserDetailsImpl) principal;
            return userDetails.getFullname();
        }

        return principal.toString();
    }

    @Data
    public static class AuthInfo {
        private final String username;
        private final String fullName;
        private final UserRole userRole;
        private final boolean signedIn;
    }
}
