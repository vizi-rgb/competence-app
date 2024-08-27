package com.project.competence.employee.service;

import com.project.competence.employee.domain.Employee;
import com.project.competence.employee.domain.Project;
import com.project.competence.employee.domain.Skill;
import com.project.competence.employee.domain.SkillName;
import com.project.competence.employee.domain.repository.EmployeeRepository;
import com.project.competence.employee.domain.repository.ProjectRepository;
import com.project.competence.employee.domain.repository.SkillRepository;
import com.project.competence.employee.dto.CreateEmployeeRequest;
import com.project.competence.employee.dto.EmployeeResource;
import com.project.competence.employee.dto.PartiallyUpdateEmployeeRequest;
import com.project.competence.employee.dto.ProjectResource;
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
    public List<EmployeeResource> getEmployees() {
        return employeeRepository
                .findAll()
                .stream()
                .map(employeeMapper::employeeToEmployeeResource)
                .toList();
    }

    @Transactional(readOnly = true)
    public EmployeeResource getEmployee(UUID id) {
        final var employee = mapEmployeeIdToEmployee(id);
        return employeeMapper.employeeToEmployeeResource(employee);
    }

    @Transactional
    public void createEmployee(CreateEmployeeRequest request) {
        final var employeeManager = mapEmployeeIdToEmployee(request.managerId());
        final var skills = mapSkillNameCollectionToSkillSet(request.skills());
        final var projects = mapProjectResourceCollectionToProjectSet(request.projects());

        final var employee = employeeMapper.createEmployeeRequestToEmployee(
                request,
                employeeManager,
                skills,
                projects
        );

        employeeRepository.save(employee);
    }

    @Transactional
    public void updateEmployee(UUID id, CreateEmployeeRequest employee) {
        if (!employeeRepository.existsById(id)) {
            log.error("Tried to update employee with id {}, but employee not found", id);
            throw new EntityNotFoundException(id);
        }

        Employee manager = null;
        if (employee.managerId() != null) {
            manager = mapEmployeeIdToEmployee(employee.managerId());
        }
        final var skills = mapSkillNameCollectionToSkillSet(employee.skills());
        final var projects = mapProjectResourceCollectionToProjectSet(employee.projects());

        final var employeeToSave = employeeMapper.createEmployeeRequestToEmployee(
                employee,
                manager,
                skills,
                projects
        );
        employeeToSave.setId(id);

        employeeRepository.save(employeeToSave);
    }

    @Transactional
    public void partiallyUpdateEmployee(UUID id, PartiallyUpdateEmployeeRequest request) {
        final var employee = mapEmployeeIdToEmployee(id);
        doPartialUpdates(employee, request);
        employeeRepository.save(employee);
    }

    @Transactional
    public void deleteEmployee(UUID id) {
        final var employee = mapEmployeeIdToEmployee(id);
        employeeRepository.delete(employee);
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

    private Skill mapSkillNameToSkill(SkillName skillName) {
        return skillRepository.findByName(skillName).orElseThrow(
                () -> {
                    log.error("Skill with name {} not found", skillName);
                    return new EntityNotFoundException(skillName.toString());
                }
        );
    }

    private Set<Skill> mapSkillNameCollectionToSkillSet(Collection<SkillName> skillNameCollection) {
        return skillNameCollection
                .stream()
                .map(this::mapSkillNameToSkill)
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
            final var skills = mapSkillNameCollectionToSkillSet(request.skills());
            employee.setSkills(skills);
        }
        if (request.projects() != null) {
            final var projects = mapProjectResourceCollectionToProjectSet(request.projects());
            employee.setProjects(projects);
        }
    }
}
