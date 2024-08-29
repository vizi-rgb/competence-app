package com.project.competence.employee.service;

import com.project.competence.employee.domain.Employee;
import com.project.competence.employee.domain.Project;
import com.project.competence.employee.domain.Skill;
import com.project.competence.employee.domain.repository.EmployeeRepository;
import com.project.competence.employee.domain.repository.ProjectRepository;
import com.project.competence.employee.domain.repository.SkillRepository;
import com.project.competence.employee.dto.*;
import com.project.competence.employee.exception.EmployeeIsSomeonesManager;
import com.project.competence.employee.mapper.EmployeeMapper;
import com.project.competence.exception.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final EmployeeMapper employeeMapper;
    private final SkillRepository skillRepository;
    private final ProjectRepository projectRepository;

    @Transactional(readOnly = true)
    public List<EmployeeCompactResource> getEmployees() {
        log.info("Get all employees");
        return employeeRepository
                .findAll()
                .stream()
                .map(employeeMapper::employeeToEmployeeCompactResource)
                .toList();
    }

    @Transactional(readOnly = true)
    public EmployeeResource getEmployee(UUID id) {
        final var employee = mapEmployeeIdToEmployee(id);
        log.info("Get employee by id: {}", id);
        return employeeMapper.employeeToEmployeeResource(employee);
    }

    @Transactional(readOnly = true)
    public List<EmployeeCompactResource> getEmployeeAvailableManagers(UUID id) {
        log.info("Get employee available managers by id: {}", id);
        return employeeRepository
                .findAll()
                .stream()
                .filter(employee -> !employee.getId().equals(id))
                .filter(employee -> employee.getManager() == null || !employee.getManager().getId().equals(id))
                .map(employeeMapper::employeeToEmployeeCompactResource)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<EmployeeCompactResource> searchEmployees(String name, String surname) {
        log.info("Search employees by name: {} and surname: {}", name, surname);
        return employeeRepository
                .findAllByNameContainingIgnoreCaseAndSurnameContainingIgnoreCase(name, surname)
                .stream()
                .map(employeeMapper::employeeToEmployeeCompactResource)
                .toList();
    }

    @Transactional
    public void createEmployee(CreateEmployeeRequest request) {
        log.info("Create employee: {}", request);
        final var employee = employeeFromRequest(request);

        employeeRepository.save(employee);
    }

    @Transactional
    public void updateEmployee(UUID id, CreateEmployeeRequest employee) {
        if (!employeeRepository.existsById(id)) {
            log.error("Tried to update employee with id {}, but employee not found", id);
            throw new EntityNotFoundException(id);
        }
        log.info("Update employee: {}", employee);

        final var employeeToSave = employeeFromRequest(employee);
        employeeToSave.setId(id);

        employeeRepository.save(employeeToSave);
    }

    @Transactional
    public void partiallyUpdateEmployee(UUID id, PartiallyUpdateEmployeeRequest request) {
        final var employee = mapEmployeeIdToEmployee(id);
        log.info("Partially update employee: {}", employee);
        doPartialUpdates(employee, request);
        employeeRepository.save(employee);
    }

    @Transactional
    public void deleteEmployee(UUID id) {
        final var employee = mapEmployeeIdToEmployee(id);
        final var subordinates = employeeRepository.findAllByManager(employee);

        if (!subordinates.isEmpty()) {
            throw new EmployeeIsSomeonesManager(employee);
        }

        log.info("Delete employee: {}", employee);
        employeeRepository.delete(employee);
    }

    private Employee employeeFromRequest(CreateEmployeeRequest request) {
        Employee manager = null;
        if (request.managerId() != null) {
            manager = mapEmployeeIdToEmployee(request.managerId());
        }
        final var skills = mapSkillResourcesToSkillSet(request.skills());
        final var projects = mapProjectResourceCollectionToProjectSet(request.projects());

        return employeeMapper.createEmployeeRequestToEmployee(
                request,
                manager,
                skills,
                projects
        );
    }

    private Employee mapEmployeeIdToEmployee(UUID id) {
        return employeeRepository
                .findEmployeeById(id)
                .orElseThrow(
                        () -> {
                            log.error("Employee with id {} not found", id);
                            return new EntityNotFoundException(id);
                        }
                );
    }

    private Skill mapSkillResourceToSkill(SkillResource skillResource) {
        final var skillName = skillResource.name();
        return skillRepository.findByName(skillName).orElseThrow(
                () -> {
                    log.error("Skill with name {} not found", skillName);
                    return new EntityNotFoundException(skillName.toString());
                }
        );
    }

    private Set<Skill> mapSkillResourcesToSkillSet(Collection<SkillResource> skillResources) {
        return skillResources
                .stream()
                .map(this::mapSkillResourceToSkill)
                .collect(Collectors.toSet());
    }

    private Project mapProjectResourceToProject(ProjectResource projectResource) {
        return projectRepository.findByTitle(projectResource.title()).orElseThrow(
                () -> {
                    log.error("Project with title {} not found", projectResource.title());
                    return new EntityNotFoundException(projectResource.title());
                }
        );
    }

    private Set<Project> mapProjectResourceCollectionToProjectSet(
            Collection<ProjectResource> projectResourceCollection
    ) {
        return projectResourceCollection
                .stream()
                .map(this::mapProjectResourceToProject)
                .collect(Collectors.toSet());
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
        if (request.managerId() != null) {
            final var manager = mapEmployeeIdToEmployee(request.managerId());
            employee.setManager(manager);
        }
        if (request.skills() != null) {
            final var skills = mapSkillResourcesToSkillSet(request.skills());
            employee.setSkills(skills);
        }
        if (request.projects() != null) {
            final var projects = mapProjectResourceCollectionToProjectSet(request.projects());
            employee.setProjects(projects);
        }
    }
}
