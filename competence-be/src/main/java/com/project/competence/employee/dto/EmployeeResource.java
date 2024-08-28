package com.project.competence.employee.dto;

import lombok.Builder;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Builder
public record EmployeeResource(
        UUID id,
        String name,
        String surname,
        LocalDate dateOfEmployment,
        EmployeeResource manager,
        List<SkillResource> skills,
        List<ProjectResource> projects
) {
}
