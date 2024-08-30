package com.project.competence.employee.dto;

import com.project.competence.validator.NullOrNotBlank;
import lombok.Builder;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Builder
public record PartiallyUpdateEmployeeRequest(
        @NullOrNotBlank String name,
        @NullOrNotBlank String surname,
        LocalDate dateOfEmployment,
        UUID managerId,
        List<SkillResource> skills,
        List<ProjectResource> projects
) {
}
