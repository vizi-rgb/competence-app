package com.project.competence.exception;

import com.project.competence.employee.domain.Employee;
import org.springframework.http.HttpStatus;

public class EmployeeIsSomeonesManager extends ApplicationException {
    private final static String MESSAGE = "Cannot remove employee with id %s as he is someone's manager";

    public EmployeeIsSomeonesManager(Employee employee) {
        super(String.format(MESSAGE, employee.getId()));
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.METHOD_NOT_ALLOWED;
    }
}
