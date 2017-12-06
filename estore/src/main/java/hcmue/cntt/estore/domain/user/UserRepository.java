/*
 * Copyright (c) 2017. KMS Technology, Inc.
 */

package hcmue.cntt.estore.domain.user;

import org.springframework.data.jpa.repository.JpaRepository;

import javax.jws.soap.SOAPBinding;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String>, UserRepositoryCustom {
    Optional<User> findOneByUsername(String username);

    List<User> findAllByStoreId(Long storeId);
}
