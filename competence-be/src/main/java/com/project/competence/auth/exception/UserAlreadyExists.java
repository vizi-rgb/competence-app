package com.project.competence.auth.exception;

import com.project.competence.exception.ApplicationException;
import org.springframework.http.HttpStatus;

public class UserAlreadyExists extends ApplicationException {
    private static final String MESSAGE = "User %s already exists";

    public UserAlreadyExists(String username) {
        super(String.format(MESSAGE, username));
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.CONFLICT;
    }
}
