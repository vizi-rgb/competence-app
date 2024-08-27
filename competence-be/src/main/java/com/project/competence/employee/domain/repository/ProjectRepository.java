package com.project.competence.employee.domain.repository;

import com.project.competence.employee.domain.Project;
import jakarta.annotation.Nonnull;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    Optional<Project> findByTitle(String title);

    @EntityGraph(attributePaths = "technologies")
    @Nonnull
    List<Project> findAll();
}
