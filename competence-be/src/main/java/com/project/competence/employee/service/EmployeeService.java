package com.project.competence.employee.service;

import com.project.competence.employee.domain.Employee;
import com.project.competence.employee.domain.repository.EmployeeRepository;
import com.project.competence.employee.dto.CreateEmployeeRequest;
import com.project.competence.employee.dto.EmployeeResource;
import com.project.competence.employee.dto.PartiallyUpdateEmployeeRequest;
import com.project.competence.employee.mapper.EmployeeMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final EmployeeMapper employeeMapper;

    @Transactional(readOnly = true)
    public List<EmployeeResource> getEmployees() {
        return employeeRepository
                .findAll()
                .stream()
                .map(employeeMapper::employeeToEmployeeResource)
                .toList();
    }

    @Transactional(readOnly = true)
    public EmployeeResource getEmployee(UUID id) {
        final var employee = findEmployeeByIdOrElseThrow(id);
        return employeeMapper.employeeToEmployeeResource(employee);
    }

    @Transactional
    public void createEmployee(CreateEmployeeRequest request) {
        final var employee = employeeMapper.createEmployeeRequestToEmployee(request);
        employeeRepository.save(employee);
    }

    @Transactional
    public void updateEmployee(UUID id, CreateEmployeeRequest employee) {
        if (!employeeRepository.existsById(id)) {
            log.error("Tried to update employee with id {}, but employee not found", id);
            throw new NoSuchElementException("Employee with the given id does not exist");
        }

        final var employeeToSave = employeeMapper.createEmployeeRequestToEmployee(employee);
        employeeToSave.setId(id);

        employeeRepository.save(employeeToSave);
    }

    @Transactional
    public void partiallyUpdateEmployee(UUID id, PartiallyUpdateEmployeeRequest request) {
        final var employee = findEmployeeByIdOrElseThrow(id);
        doPartialUpdates(employee, request);
        employeeRepository.save(employee);
    }

    @Transactional
    public void deleteEmployee(UUID id) {
        final var employee = findEmployeeByIdOrElseThrow(id);
        employeeRepository.delete(employee);
    }

    private Employee findEmployeeByIdOrElseThrow(UUID id) {
        return employeeRepository
                .findEmployeeById(id)
                .orElseThrow(
                        () -> {
                            log.error("Employee with id {} not found", id);
                            return new NoSuchElementException("Employee with the given id does not exist");
                        }
                );
    }

    private void doPartialUpdates(Employee employee, PartiallyUpdateEmployeeRequest request) {
        if (request.name() != null) {
            employee.setName(request.name());
        }
        if (request.surname() != null) {
            employee.setSurname(request.surname());
        }
        if (request.dateOfEmployment() != null) {
            employee.setDateOfEmployment(request.dateOfEmployment());
        }
        if (request.manager() != null) {
            employee.setManager(request.manager());
        }
        if (request.skills() != null) {
            employee.setSkills(new HashSet<>(request.skills()));
        }
        if (request.projects() != null) {
            employee.setProjects(new HashSet<>(request.projects()));
        }
    }
}
