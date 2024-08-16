package com.project.competence.employee.mapper;

import com.project.competence.employee.domain.Employee;
import com.project.competence.employee.dto.CreateEmployeeRequest;
import com.project.competence.employee.dto.EmployeeResource;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface EmployeeMapper {

    EmployeeResource employeeToEmployeeResource(Employee employee);

    Employee createEmployeeRequestToEmployee(CreateEmployeeRequest createEmployeeRequest);
}
