package com.project.competence.employee.mapper;

import com.project.competence.employee.domain.Employee;
import com.project.competence.employee.domain.repository.EmployeeRepository;
import com.project.competence.employee.dto.CreateEmployeeRequest;
import com.project.competence.employee.dto.EmployeeResource;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.UUID;

@Mapper(componentModel = "spring", uses = {SkillMapper.class, ProjectMapper.class})
public abstract class EmployeeMapper {
    private EmployeeRepository employeeRepository;

    @Autowired
    public void setEmployeeRepository(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public abstract EmployeeResource employeeToEmployeeResource(Employee employee);

    @Mapping(source = "managerId", target = "manager")
    public abstract Employee createEmployeeRequestToEmployee(CreateEmployeeRequest createEmployeeRequest);

    protected Employee managerIdToEmployee(UUID managerId) {
        return this.employeeRepository.findEmployeeById(managerId).orElse(null);
    }
}
