package com.project.competence.employee.mapper;

import com.project.competence.employee.domain.Project;
import com.project.competence.employee.domain.repository.ProjectRepository;
import com.project.competence.employee.dto.ProjectResource;
import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring")
public abstract class ProjectMapper {

    private ProjectRepository projectRepository;

    @Autowired
    public void setProjectRepository(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public abstract ProjectResource projectToResource(Project project);

    public Project projectResourceToProject(ProjectResource projectResource) {
        return projectRepository.findByTitle(projectResource.title()).orElse(null);
    }
}
