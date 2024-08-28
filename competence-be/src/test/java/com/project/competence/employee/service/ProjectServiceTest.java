package com.project.competence.employee.service;

import com.project.competence.employee.domain.Project;
import com.project.competence.employee.domain.repository.ProjectRepository;
import com.project.competence.employee.dto.ProjectResource;
import com.project.competence.employee.mapper.ProjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProjectServiceTest {

    @Mock
    private ProjectMapper projectMapper;

    @Mock
    private ProjectRepository projectRepository;

    @InjectMocks
    private ProjectService underTest;

    @Test
    void givenNoProjectsInRepositoryShouldReturnEmptyList() {
        // given
        final var project = provideSimpleProject();
        final var mappedProject = provideSimpleProjectResource(project);
        when(projectRepository.findAll()).thenReturn(List.of(project));
        when(projectMapper.projectToResource(project)).thenReturn(mappedProject);

        // when
        final var projects = underTest.getAllProjects();

        // then
        assertThat(projects).isNotEmpty().hasSize(1).contains(mappedProject);
    }

    @Test
    void givenProjectsInRepositoryShouldReturnNonEmptyList() {
        // given
        when(projectRepository.findAll()).thenReturn(List.of());

        // when
        final var projects = underTest.getAllProjects();

        // then
        assertThat(projects).isEmpty();
    }

    private Project provideSimpleProject() {
        return Project.builder()
                .id(1L)
                .title("Title")
                .description("Description")
                .technologies(Set.of())
                .build();
    }

    private ProjectResource provideSimpleProjectResource(Project project) {
        return new ProjectResource(
                project.getTitle(),
                project.getDescription(),
                List.of()
        );
    }
}