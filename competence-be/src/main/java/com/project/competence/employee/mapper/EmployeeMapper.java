package com.project.competence.employee.mapper;

import com.project.competence.employee.domain.Employee;
import com.project.competence.employee.domain.Project;
import com.project.competence.employee.domain.Skill;
import com.project.competence.employee.dto.CreateEmployeeRequest;
import com.project.competence.employee.dto.EmployeeCompactResource;
import com.project.competence.employee.dto.EmployeeResource;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Set;

@Mapper(componentModel = "spring", uses = {SkillMapper.class, ProjectMapper.class})
public interface EmployeeMapper {
    EmployeeResource employeeToEmployeeResource(Employee employee);

    EmployeeCompactResource employeeToEmployeeCompactResource(Employee employee);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "name", source = "request.name")
    @Mapping(target = "surname", source = "request.surname")
    @Mapping(target = "dateOfEmployment", source = "request.dateOfEmployment")
    @Mapping(target = "skills", source = "skills")
    @Mapping(target = "manager", source = "manager")
    @Mapping(target = "projects", source = "projects")
    Employee createEmployeeRequestToEmployee(
            CreateEmployeeRequest request,
            Employee manager,
            Set<Skill> skills,
            Set<Project> projects
    );
}
