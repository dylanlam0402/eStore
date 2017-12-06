/*
 * Copyright (c) 2017. KMS Technology, Inc.
 */
package hcmue.cntt.estore.infras.repository;

import hcmue.cntt.estore.domain.user.UserRepositoryCustom;
import org.springframework.stereotype.Repository;


@Repository
public class UserRepositoryImpl implements UserRepositoryCustom {
    @Override
    public void searchUsers(String keyword) {
        // ...
    }
}
