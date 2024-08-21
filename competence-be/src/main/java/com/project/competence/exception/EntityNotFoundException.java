package com.project.competence.exception;

import org.springframework.http.HttpStatus;

import java.util.UUID;

public class EntityNotFoundException extends ApplicationException {
    private final static String MESSAGE_UUID = "Entity with id %s was not found";
    private final static String MESSAGE_NAME = "Entity with name %s was not found";

    public EntityNotFoundException(UUID id) {
        super(String.format(MESSAGE_UUID, id.toString()));
    }

    public EntityNotFoundException(String name) {
        super(String.format(MESSAGE_NAME, name));
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.NOT_FOUND;
    }
}
