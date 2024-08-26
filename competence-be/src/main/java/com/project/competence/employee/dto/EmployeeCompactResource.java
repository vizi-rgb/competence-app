package com.project.competence.employee.dto;

import java.time.LocalDate;
import java.util.UUID;

public record EmployeeCompactResource(
        UUID id,
        String name,
        String surname,
        LocalDate dateOfEmployment
) {
}
