package com.project.competence.employee.service;

import com.project.competence.employee.domain.Employee;
import com.project.competence.employee.domain.Project;
import com.project.competence.employee.domain.Skill;
import com.project.competence.employee.domain.SkillName;
import com.project.competence.employee.domain.repository.EmployeeRepository;
import com.project.competence.employee.domain.repository.ProjectRepository;
import com.project.competence.employee.domain.repository.SkillRepository;
import com.project.competence.employee.dto.*;
import com.project.competence.employee.exception.EmployeeIsSomeonesManager;
import com.project.competence.employee.mapper.EmployeeMapper;
import com.project.competence.exception.EntityNotFoundException;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatExceptionOfType;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class EmployeeServiceTest {

    private static UUID employeeId;
    private static UUID managerId;

    @Mock
    private EmployeeRepository employeeRepository;

    @Mock
    private EmployeeMapper employeeMapper;

    @Mock
    private SkillRepository skillRepository;

    @Mock
    private ProjectRepository projectRepository;

    @InjectMocks
    private EmployeeService underTest;

    @BeforeAll
    static void init() {
        employeeId = UUID.randomUUID();
        managerId = UUID.randomUUID();
    }

    @Test
    void givenNoEmployeesShouldReturnEmptyList() {
        // given
        when(employeeRepository.findAll()).thenReturn(List.of());

        // when
        final var employees = underTest.getEmployees();

        // then
        assertThat(employees).isEmpty();
    }

    @Test
    void givenEmployeesShouldReturnEmployees() {
        // given
        final var employee = provideSimpleEmployee();
        final var mappedEmployee = provideSimpleEmployeeCompactResource(employee);
        when(employeeRepository.findAll()).thenReturn(List.of(employee));
        when(employeeMapper.employeeToEmployeeCompactResource(employee)).thenReturn(mappedEmployee);

        // when
        final var employees = underTest.getEmployees();

        // then
        assertThat(employees).isNotEmpty().hasSize(1).contains(mappedEmployee);
    }

    @Test
    void givenInvalidEmployeeIdShouldThrowException() {
        // given
        final var invalidId = UUID.randomUUID();
        when(employeeRepository.findEmployeeById(invalidId)).thenReturn(Optional.empty());

        // when then
        assertThatExceptionOfType(EntityNotFoundException.class)
                .isThrownBy(() -> underTest.getEmployee(invalidId));
    }

    @Test
    void givenEmployeeIdShouldReturnEmployee() {
        // given
        final var employee = provideSimpleEmployee();
        final var mappedEmployee = provideSimpleEmployeeResource(employee);
        when(employeeRepository.findEmployeeById(employeeId)).thenReturn(Optional.of(employee));
        when(employeeMapper.employeeToEmployeeResource(employee)).thenReturn(mappedEmployee);

        // when
        final var employeeById = underTest.getEmployee(employeeId);

        // then
        assertThat(employeeById).isEqualTo(mappedEmployee);
    }

    @Test
    void givenNoAvailableManagersShouldReturnEmptyList() {
        // given
        final var employee = provideSimpleEmployee();
        when(employeeRepository.findAll()).thenReturn(List.of(employee));

        // when
        final var managers = underTest.getEmployeeAvailableManagers(employeeId);

        // when
        assertThat(managers).isEmpty();
    }

    @Test
    void givenManagersShouldReturnManagers() {
        // given
        final var employee = provideSimpleEmployee();
        final var manager = provideSimpleManager();
        final var mappedManager = provideSimpleEmployeeCompactResource(manager);
        when(employeeRepository.findAll()).thenReturn(List.of(employee, manager));
        when(employeeMapper.employeeToEmployeeCompactResource(manager)).thenReturn(mappedManager);

        // when
        final var managers = underTest.getEmployeeAvailableManagers(employeeId);

        // then
        assertThat(managers).isNotEmpty().hasSize(1).contains(mappedManager);
    }

    @Test
    void givenOnlySubordinateShouldReturnEmptyList() {
        // given
        final var manager = provideSimpleManager();
        final var employee = provideSimpleEmployee();
        employee.setManager(manager);
        when(employeeRepository.findAll()).thenReturn(List.of(employee, manager));

        // when
        final var managers = underTest.getEmployeeAvailableManagers(managerId);

        // then
        assertThat(managers).isEmpty();
    }

    @Test
    void givenInvalidSearchTermsShouldReturnEmptyList() {
        // given
        final var invalidName = "name";
        final var invalidSurname = "surname";
        when(
                employeeRepository
                        .findAllByNameContainingIgnoreCaseAndSurnameContainingIgnoreCase(
                                invalidName,
                                invalidSurname
                        )
        ).thenReturn(List.of());

        // when
        final var employees = underTest.searchEmployees(invalidName, invalidSurname);

        // then
        assertThat(employees).isEmpty();
    }

    @Test
    void givenValidSearchTermsShouldReturnEmployee() {
        // given
        final var validName = "john";
        final var validSurname = "doe";
        final var employee = provideSimpleEmployee();
        final var mappedEmployee = provideSimpleEmployeeCompactResource(employee);
        when(
                employeeRepository
                        .findAllByNameContainingIgnoreCaseAndSurnameContainingIgnoreCase(
                                validName,
                                validSurname
                        )
        ).thenReturn(List.of(employee));
        when(employeeMapper.employeeToEmployeeCompactResource(employee)).thenReturn(mappedEmployee);

        // when
        final var employees = underTest.searchEmployees(validName, validSurname);

        // then
        assertThat(employees).isNotEmpty().hasSize(1).contains(mappedEmployee);
    }


    @Test
    void givenValidCreateEmployeeRequestShouldCreateEmployee() {
        // given
        final var employee = provideSimpleEmployee();
        final var manager = provideSimpleManager();
        employee.setManager(manager);
        final var createRequest = provideSimpleCreateEmployeeRequest(employee);
        when(employeeRepository.findEmployeeById(managerId)).thenReturn(Optional.of(manager));
        when(employeeMapper.createEmployeeRequestToEmployee(
                createRequest,
                manager,
                Set.of(),
                Set.of()
        )).thenReturn(employee);

        // when
        underTest.createEmployee(createRequest);

        // then
        verify(employeeRepository).save(employee);
    }

    @Test
    void givenInvalidManagerInCreateEmployeeRequestShouldThrowException() {
        // given
        final var employee = provideSimpleEmployee();
        final var manager = provideSimpleManager();
        employee.setManager(manager);
        final var createRequest = provideSimpleCreateEmployeeRequest(employee);
        when(employeeRepository.findEmployeeById(managerId)).thenReturn(Optional.empty());

        // when then
        assertThatExceptionOfType(EntityNotFoundException.class)
                .isThrownBy(() -> underTest.createEmployee(createRequest));
    }

    @Test
    void givenInvalidSkillInCreateEmployeeRequestShouldThrowException() {
        // given
        final var employee = provideSimpleEmployee();
        final var skill = provideSimpleSkill();
        final var skillResource = provideSimpleSkillResource(skill);
        final var createRequest = provideSimpleCreateEmployeeRequest(
                employee,
                List.of(skillResource),
                List.of()
        );
        when(skillRepository.findByName(skill.getName())).thenReturn(Optional.empty());

        // when then
        assertThatExceptionOfType(EntityNotFoundException.class)
                .isThrownBy(() -> underTest.createEmployee(createRequest));
    }

    @Test
    void givenInvalidProjectInCreateEmployeeRequestShouldThrowException() {
        // given
        final var employee = provideSimpleEmployee();
        final var project = provideSimpleProject();
        final var projectResource = provideSimpleProjectResource(project);
        final var createRequest = provideSimpleCreateEmployeeRequest(
                employee,
                List.of(),
                List.of(projectResource)
        );
        when(projectRepository.findByTitle(project.getTitle())).thenReturn(Optional.empty());

        // when then
        assertThatExceptionOfType(EntityNotFoundException.class)
                .isThrownBy(() -> underTest.createEmployee(createRequest));
    }

    @Test
    void givenValidUpdateEmployeeRequestShouldUpdateEmployee() {
        // given
        final var employee = provideSimpleEmployee();
        final var manager = provideSimpleManager();
        employee.setManager(manager);
        final var updateRequest = provideSimpleCreateEmployeeRequest(employee);
        when(employeeRepository.existsById(employeeId)).thenReturn(true);
        when(employeeRepository.findEmployeeById(managerId)).thenReturn(Optional.of(manager));
        when(employeeMapper.createEmployeeRequestToEmployee(
                updateRequest,
                manager,
                Set.of(),
                Set.of()
        )).thenReturn(employee);

        // when
        underTest.updateEmployee(employeeId, updateRequest);

        // then
        verify(employeeRepository).save(employee);
    }

    @Test
    void givenInvalidEmployeeIdInUpdateEmployeeRequestShouldThrowException() {
        // given
        final var invalidId = UUID.randomUUID();
        final var employee = provideSimpleEmployee();
        final var updateRequest = provideSimpleCreateEmployeeRequest(employee);
        when(employeeRepository.existsById(invalidId)).thenReturn(false);

        // when then
        assertThatExceptionOfType(EntityNotFoundException.class)
                .isThrownBy(() -> underTest.updateEmployee(invalidId, updateRequest));
    }

    @Test
    void givenInvalidManagerIdInUpdateEmployeeRequestShouldThrowException() {
        // given
        final var employee = provideSimpleEmployee();
        final var manager = provideSimpleManager();
        employee.setManager(manager);
        final var updateRequest = provideSimpleCreateEmployeeRequest(employee);
        when(employeeRepository.existsById(employeeId)).thenReturn(true);
        when(employeeRepository.findEmployeeById(managerId)).thenReturn(Optional.empty());

        // when then
        assertThatExceptionOfType(EntityNotFoundException.class)
                .isThrownBy(() -> underTest.updateEmployee(employeeId, updateRequest));
    }

    @Test
    void givenInvalidSkillInUpdateEmployeeRequestShouldThrowException() {
        // given
        final var employee = provideSimpleEmployee();
        final var skill = provideSimpleSkill();
        final var skillResource = provideSimpleSkillResource(skill);
        final var updateRequest = provideSimpleCreateEmployeeRequest(
                employee,
                List.of(skillResource),
                List.of()
        );
        when(employeeRepository.existsById(employeeId)).thenReturn(true);
        when(skillRepository.findByName(skill.getName())).thenReturn(Optional.empty());

        // when then
        assertThatExceptionOfType(EntityNotFoundException.class)
                .isThrownBy(() -> underTest.updateEmployee(employeeId, updateRequest));
    }

    @Test
    void givenInvalidProjectInUpdateEmployeeRequestShouldThrowException() {
        // given
        final var employee = provideSimpleEmployee();
        final var project = provideSimpleProject();
        final var projectResource = provideSimpleProjectResource(project);
        final var updateRequest = provideSimpleCreateEmployeeRequest(
                employee,
                List.of(),
                List.of(projectResource)
        );
        when(employeeRepository.existsById(employeeId)).thenReturn(true);
        when(projectRepository.findByTitle(project.getTitle())).thenReturn(Optional.empty());

        // when then
        assertThatExceptionOfType(EntityNotFoundException.class)
                .isThrownBy(() -> underTest.updateEmployee(employeeId, updateRequest));
    }

    @Test
    void givenOnlyNullsInPartiallyUpdateEmployeeShouldNotUpdateEmployee() {
        // given
        final var employee = provideSimpleEmployee();
        final var nullOnlyUpdateRequest = provideNullOnlyPartiallyUpdateRequest();
        when(employeeRepository.findEmployeeById(employeeId)).thenReturn(Optional.of(employee));

        // when
        underTest.partiallyUpdateEmployee(employeeId, nullOnlyUpdateRequest);

        // then
        verify(employeeRepository).save(employee);
    }

    @Test
    void givenInvalidEmployeeIdInPartiallyUpdateEmployeeRequestShouldUpdateEmployee() {
        // given
        final var employee = provideSimpleEmployee();
        final var invalidId = UUID.randomUUID();
        final var updateRequest = provideSimplePartiallyUpdateEmployeeRequest(employee);
        when(employeeRepository.findEmployeeById(invalidId)).thenReturn(Optional.empty());

        // when then
        assertThatExceptionOfType(EntityNotFoundException.class)
                .isThrownBy(() -> underTest.partiallyUpdateEmployee(invalidId, updateRequest));
    }

    @Test
    void givenInvalidManagerIdInPartiallyUpdateEmployeeRequestShouldUpdateEmployee() {
        // given
        final var employee = provideSimpleEmployee();
        final var manager = provideSimpleManager();
        employee.setManager(manager);
        final var updateRequest = provideSimplePartiallyUpdateEmployeeRequest(employee);
        when(employeeRepository.findEmployeeById(employeeId)).thenReturn(Optional.of(employee));
        when(employeeRepository.findEmployeeById(managerId)).thenReturn(Optional.empty());


        // when then
        assertThatExceptionOfType(EntityNotFoundException.class)
                .isThrownBy(() -> underTest.partiallyUpdateEmployee(employeeId, updateRequest));
    }

    @Test
    void givenInvalidSkillIdInPartiallyUpdateEmployeeRequestShouldUpdateEmployee() {
        // given
        final var employee = provideSimpleEmployee();
        final var skill = provideSimpleSkill();
        final var skillResource = provideSimpleSkillResource(skill);
        final var updateRequest = provideSimplePartiallyUpdateEmployeeRequest(
                employee,
                List.of(skillResource),
                List.of()
        );
        when(employeeRepository.findEmployeeById(employeeId)).thenReturn(Optional.of(employee));
        when(skillRepository.findByName(skill.getName())).thenReturn(Optional.empty());


        // when then
        assertThatExceptionOfType(EntityNotFoundException.class)
                .isThrownBy(() -> underTest.partiallyUpdateEmployee(employeeId, updateRequest));
    }

    @Test
    void givenInvalidProjectIdInPartiallyUpdateEmployeeRequestShouldUpdateEmployee() {
        // given
        final var employee = provideSimpleEmployee();
        final var project = provideSimpleProject();
        final var projectResource = provideSimpleProjectResource(project);
        final var updateRequest = provideSimplePartiallyUpdateEmployeeRequest(
                employee,
                List.of(),
                List.of(projectResource)
        );
        when(employeeRepository.findEmployeeById(employeeId)).thenReturn(Optional.of(employee));
        when(projectRepository.findByTitle(project.getTitle())).thenReturn(Optional.empty());


        // when then
        assertThatExceptionOfType(EntityNotFoundException.class)
                .isThrownBy(() -> underTest.partiallyUpdateEmployee(employeeId, updateRequest));
    }

    @Test
    void givenValidIdShouldDeleteEmployee() {
        // given
        final var validId = employeeId;
        final var employee = provideSimpleEmployee();
        when(employeeRepository.findEmployeeById(validId)).thenReturn(Optional.of(employee));

        // when
        underTest.deleteEmployee(validId);

        // then
        verify(employeeRepository).delete(employee);
    }

    @Test
    void givenInvalidEmployeeIdShouldThrowExceptionWhenDeleting() {
        // given
        final var invalidId = UUID.randomUUID();
        when(employeeRepository.findEmployeeById(invalidId)).thenReturn(Optional.empty());

        // when then
        assertThatExceptionOfType(EntityNotFoundException.class)
                .isThrownBy(() -> underTest.deleteEmployee(invalidId));
    }

    @Test
    void givenEmployeeThatIsSomeonesManagerShouldThrowExceptionWhenDeleting() {
        // given
        final var subordinate = provideSimpleEmployee();
        final var employee = provideSimpleManager();
        subordinate.setManager(employee);
        when(employeeRepository.findEmployeeById(employeeId)).thenReturn(Optional.of(employee));
        when(employeeRepository.findAllByManager(employee)).thenReturn(List.of(subordinate));

        // when then
        assertThatExceptionOfType(EmployeeIsSomeonesManager.class)
                .isThrownBy(() -> underTest.deleteEmployee(employeeId));
    }

    private Employee provideSimpleEmployee() {
        final var date = LocalDate.of(2020, 1, 1);
        return Employee.builder()
                .id(employeeId)
                .name("John")
                .surname("Doe")
                .dateOfEmployment(date)
                .manager(null)
                .skills(Set.of())
                .projects(Set.of())
                .build();
    }

    private EmployeeResource provideSimpleEmployeeResource(Employee employee) {
        return EmployeeResource.builder()
                .id(employee.getId())
                .name(employee.getName())
                .surname(employee.getSurname())
                .dateOfEmployment(employee.getDateOfEmployment())
                .manager(null)
                .skills(List.of())
                .projects(List.of())
                .build();
    }

    private EmployeeCompactResource provideSimpleEmployeeCompactResource(Employee employee) {
        return EmployeeCompactResource.builder()
                .id(employee.getId())
                .name(employee.getName())
                .surname(employee.getSurname())
                .dateOfEmployment(employee.getDateOfEmployment())
                .build();
    }

    private Employee provideSimpleManager() {
        final var date = LocalDate.of(2010, 1, 1);
        return Employee.builder()
                .id(managerId)
                .name("Bill")
                .surname("Gates")
                .dateOfEmployment(date)
                .manager(null)
                .skills(Set.of())
                .projects(Set.of())
                .build();
    }

    private CreateEmployeeRequest provideSimpleCreateEmployeeRequest(Employee employee) {
        return provideSimpleCreateEmployeeRequest(
                employee,
                List.of(),
                List.of()
        );
    }

    private CreateEmployeeRequest provideSimpleCreateEmployeeRequest(
            Employee employee,
            List<SkillResource> skills,
            List<ProjectResource> projects
    ) {
        final var managerId = employee.getManager() != null ? employee.getManager().getId() : null;

        return CreateEmployeeRequest.builder()
                .name(employee.getName())
                .surname(employee.getSurname())
                .dateOfEmployment(employee.getDateOfEmployment())
                .managerId(managerId)
                .skills(skills)
                .projects(projects)
                .build();
    }

    private Skill provideSimpleSkill() {
        return new Skill(1L, SkillName.ANGULAR);
    }

    private SkillResource provideSimpleSkillResource(Skill skill) {
        return new SkillResource(skill.getName());
    }

    private Project provideSimpleProject() {
        return Project.builder()
                .id(1L)
                .title("Project")
                .description("Project description")
                .technologies(Set.of())
                .build();
    }

    private ProjectResource provideSimpleProjectResource(Project project) {
        return ProjectResource.builder()
                .title(project.getTitle())
                .description(project.getDescription())
                .technologies(List.of())
                .build();
    }

    private PartiallyUpdateEmployeeRequest provideSimplePartiallyUpdateEmployeeRequest(Employee employee) {
        return provideSimplePartiallyUpdateEmployeeRequest(
                employee,
                List.of(),
                List.of(),
                employee.getName()
        );
    }

    private PartiallyUpdateEmployeeRequest provideSimplePartiallyUpdateEmployeeRequest(Employee employee, String newName) {
        return provideSimplePartiallyUpdateEmployeeRequest(
                employee,
                List.of(),
                List.of(),
                employee.getName()
        );
    }

    private PartiallyUpdateEmployeeRequest provideSimplePartiallyUpdateEmployeeRequest(
            Employee employee,
            List<SkillResource> skills,
            List<ProjectResource> projects
    ) {
        return provideSimplePartiallyUpdateEmployeeRequest(
                employee,
                skills,
                projects,
                employee.getName()
        );
    }

    private PartiallyUpdateEmployeeRequest provideSimplePartiallyUpdateEmployeeRequest(
            Employee employee,
            List<SkillResource> skills,
            List<ProjectResource> projects,
            String newName
    ) {
        final var managerId = employee.getManager() != null ? employee.getManager().getId() : null;
        return PartiallyUpdateEmployeeRequest.builder()
                .name(newName)
                .surname(employee.getSurname())
                .dateOfEmployment(employee.getDateOfEmployment())
                .managerId(managerId)
                .skills(skills)
                .projects(projects)
                .build();
    }

    private PartiallyUpdateEmployeeRequest provideNullOnlyPartiallyUpdateRequest() {
        return PartiallyUpdateEmployeeRequest.builder()
                .name(null)
                .surname(null)
                .dateOfEmployment(null)
                .managerId(null)
                .skills(null)
                .projects(null)
                .build();
    }
}