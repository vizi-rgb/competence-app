package com.project.competence.employee.dto;

import com.project.competence.employee.domain.Employee;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record EmployeeResource(
        UUID id,
        String name,
        String surname,
        LocalDate dateOfEmployment,
        Employee manager,
        List<SkillResource> skills,
        List<ProjectResource> projects
) {
}
