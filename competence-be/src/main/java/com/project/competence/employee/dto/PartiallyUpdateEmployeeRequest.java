package com.project.competence.employee.dto;

import com.project.competence.employee.domain.Employee;
import com.project.competence.employee.domain.Project;
import com.project.competence.employee.domain.Skill;
import com.project.competence.validator.NullOrNotBlank;

import java.time.LocalDate;
import java.util.List;

public record PartiallyUpdateEmployeeRequest(
        @NullOrNotBlank(message = "String must be null or not blank") String name,
        @NullOrNotBlank String surname,
        LocalDate dateOfEmployment,
        Employee manager,
        List<Skill> skills,
        List<Project> projects
) {
}
