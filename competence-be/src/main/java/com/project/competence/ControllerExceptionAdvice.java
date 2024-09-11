package com.project.competence;

import com.project.competence.exception.ApplicationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.Map;

@RestControllerAdvice
public class ControllerExceptionAdvice {

    private static final String RESPONSE_ERRORS_KEY = "errors";

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, List<String>>> handleMethodArgumentNotValidException(
            MethodArgumentNotValidException exception
    ) {
        final var messages = exception
                .getFieldErrors()
                .stream()
                .map(
                        (error) -> defaultMessageOr(error, String.format("%s: Not valid", error.getField()))
                )
                .toList();
        return createResponse(messages, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ApplicationException.class)
    public ResponseEntity<Map<String, List<String>>> handleApplicationException(ApplicationException exception) {
        return createResponse(exception.getMessage(), exception.getHttpStatus());
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<Void> handleAuthenticationException() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, List<String>>> handleException(Exception exception) {
        return createResponse("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private ResponseEntity<Map<String, List<String>>> createResponse(List<String> errors, HttpStatus status) {
        final var content = Map.of(RESPONSE_ERRORS_KEY, errors);
        return new ResponseEntity<>(content, status);
    }

    private ResponseEntity<Map<String, List<String>>> createResponse(String message, HttpStatus status) {
        return createResponse(List.of(message), status);
    }

    private String defaultMessageOr(FieldError error, String message) {
        return error.getDefaultMessage() != null ?
                String.format("%s: %s", error.getField(), error.getDefaultMessage())
                : message;
    }


}
