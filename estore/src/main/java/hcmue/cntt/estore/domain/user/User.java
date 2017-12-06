/*
 * Copyright (c) 2017. KMS Technology, Inc.
 */

package hcmue.cntt.estore.domain.user;

import hcmue.cntt.estore.domain.common.BaseEntity;
import hcmue.cntt.estore.domain.store.Store;
import lombok.Data;
import lombok.NoArgsConstructor;


import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Table(name = "users")
@Entity
public class User extends BaseEntity {
    private String username;
    private String password;
    private String email;
    private String firstName;
    private String lastName;
    private String languageTag;

    private boolean activated;
    private String activationKey;

    private String resetKey;

    @ManyToOne
    @JoinColumn(name="store_id")
    private Store storeId;



    @Enumerated(EnumType.STRING)
    private UserRole role;

    public String getFullname() {
        return firstName + " " + lastName;
    }
}
