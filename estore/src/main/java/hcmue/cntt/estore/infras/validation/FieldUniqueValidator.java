/*
 * Copyright (c) 2017. KMS Technology, Inc.
 */
package hcmue.cntt.estore.infras.validation;

import hcmue.cntt.estore.domain.common.BaseEntity;
import org.springframework.util.StringUtils;


import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class FieldUniqueValidator implements ConstraintValidator<FieldUnique, Object> {

    private Class<? extends BaseEntity> entity;

    private String fieldName;
    private String message;

    @PersistenceContext
    private EntityManager em;

    @Override
    public void initialize(FieldUnique annotation) {
        entity = annotation.entity();
        fieldName = annotation.field();
        if (StringUtils.isEmpty(fieldName)) {
            fieldName = "";
        }
        message = annotation.message();
    }

    @Override
    public boolean isValid(Object fieldValue, ConstraintValidatorContext context) {
        String queryString = String.format("select id from %s where %s = :fieldValue", entity.getName(), fieldName);

        boolean isValid = em
            .createQuery(queryString)
            .setParameter("fieldValue", fieldValue)
            .getResultList()
            .isEmpty();
        if (!isValid) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(message)
                .addConstraintViolation();
        }
        return isValid;
    }
}
