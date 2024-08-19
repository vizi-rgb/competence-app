package com.project.competence.employee.dto;

import com.project.competence.employee.domain.SkillName;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record CreateEmployeeRequest(
        @NotBlank String name,
        @NotBlank String surname,
        @NotNull LocalDate dateOfEmployment,
        UUID managerId,
        @NotNull List<SkillName> skills,
        @NotNull List<ProjectResource> projects
) {
}
