package com.project.competence.employee.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Builder
public record CreateEmployeeRequest(
        @NotBlank String name,
        @NotBlank String surname,
        @NotNull LocalDate dateOfEmployment,
        UUID managerId,
        @NotNull List<SkillResource> skills,
        @NotNull List<ProjectResource> projects
) {
}
