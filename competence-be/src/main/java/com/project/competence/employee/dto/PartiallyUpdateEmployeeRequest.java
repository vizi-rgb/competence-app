package com.project.competence.employee.dto;

import com.project.competence.employee.domain.SkillName;
import com.project.competence.validator.NullOrNotBlank;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record PartiallyUpdateEmployeeRequest(
        @NullOrNotBlank String name,
        @NullOrNotBlank String surname,
        LocalDate dateOfEmployment,
        UUID managerId,
        List<SkillName> skills,
        List<ProjectResource> projects
) {
}
