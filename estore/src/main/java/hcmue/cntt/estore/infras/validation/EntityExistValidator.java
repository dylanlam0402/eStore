/*
 * Copyright (c) 2017. KMS Technology, Inc.
 */
package hcmue.cntt.estore.infras.validation;


import hcmue.cntt.estore.domain.common.BaseEntity;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class EntityExistValidator implements ConstraintValidator<EntityExist, Long> {

    private Class<? extends BaseEntity> entity;

    @PersistenceContext
    private EntityManager em;

    @Override
    public void initialize(EntityExist annotation) {
        this.entity = annotation.type();
    }

    @Override
    public boolean isValid(Long entityId, ConstraintValidatorContext context) {
        StringBuilder jpql = new StringBuilder()
            .append("select id from ")
            .append(entity.getName())
            .append(" where id=")
            .append(entityId);

        Query query = em.createQuery(jpql.toString());

        return !query.getResultList().isEmpty();
    }
}
