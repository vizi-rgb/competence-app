package com.project.competence.exception;

import org.springframework.http.HttpStatus;

public abstract class ApplicationException extends RuntimeException {
    public ApplicationException() {
        super();
    }

    public ApplicationException(String message) {
        super(message);
    }

    public abstract HttpStatus getHttpStatus();
}
