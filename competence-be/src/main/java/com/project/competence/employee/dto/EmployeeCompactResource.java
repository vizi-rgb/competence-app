package com.project.competence.employee.dto;

import lombok.Builder;

import java.time.LocalDate;
import java.util.UUID;

@Builder
public record EmployeeCompactResource(
        UUID id,
        String name,
        String surname,
        LocalDate dateOfEmployment
) {
}
