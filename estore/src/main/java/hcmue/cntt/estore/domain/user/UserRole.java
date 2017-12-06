/*
 * Copyright (c) 2017. KMS Technology, Inc.
 */

package hcmue.cntt.estore.domain.user;

public enum UserRole {
    ADMIN,
    USER,
    ANONYMOUS;

    public String getAuthority() {
        return "ROLE_" + name();
    }
}
