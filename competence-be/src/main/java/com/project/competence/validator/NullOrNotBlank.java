package com.project.competence.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = {NullOrNotBlankValidator.class})
public @interface NullOrNotBlank {

    public String message() default "String must be null or not blank";

    public Class<?>[] groups() default {};

    public Class<? extends Payload>[] payload() default {};
}
