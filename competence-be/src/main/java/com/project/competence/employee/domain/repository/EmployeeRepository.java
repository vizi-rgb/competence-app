package com.project.competence.employee.domain.repository;

import com.project.competence.employee.domain.Employee;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, UUID> {
    @EntityGraph(value = "Employee.allAttributes")
    Optional<Employee> findEmployeeById(UUID id);

    List<Employee> findAllByNameContainingIgnoreCaseAndSurnameContainingIgnoreCase(String name, String surname);
}
