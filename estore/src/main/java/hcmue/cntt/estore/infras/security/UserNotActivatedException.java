/*
 * Copyright (c) 2017. KMS Technology, Inc.
 */
package hcmue.cntt.estore.infras.security;

import org.springframework.security.core.AuthenticationException;

public class UserNotActivatedException extends AuthenticationException {

    public UserNotActivatedException(String message) {
        super(message);
    }
}
