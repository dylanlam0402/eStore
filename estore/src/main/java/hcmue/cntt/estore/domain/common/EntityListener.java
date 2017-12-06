/*
 * Copyright (c) 2017. KMS Technology, Inc.
 */

package hcmue.cntt.estore.domain.common;

import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import java.time.LocalDateTime;

@Component
public class EntityListener implements ApplicationContextAware {
    private static ApplicationContext appContext;

    @Override
    public void setApplicationContext(ApplicationContext appContext) {
        // a cheat to assign APP_CONTEXT static field
        EntityListener.appContext = appContext; // NOSONAR
    }

    @PrePersist
    public void prePersist(BaseEntity entity) {
        entity.setCreatedAt(LocalDateTime.now());
        entity.setCreatedBy(getLogin());
    }

    @PreUpdate
    public void preUpdate(BaseEntity entity) {
        entity.setModifiedAt(LocalDateTime.now());
        entity.setModifiedBy(getLogin());
    }

    private String getLogin() {
        AuthService authService = appContext.getBean(AuthService.class);
        if (authService == null) {
            return AuthService.SYSTEM_USER;
        }

        return authService.getLogin();
    }
}
