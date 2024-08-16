package com.project.competence.employee.dto;

import com.project.competence.employee.domain.Employee;
import com.project.competence.employee.domain.Project;
import com.project.competence.employee.domain.Skill;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record EmployeeResource(
        UUID id,
        String name,
        String surname,
        LocalDate dateOfEmployment,
        Employee manager,
        List<Skill> skills,
        List<Project> projects
) {
}
