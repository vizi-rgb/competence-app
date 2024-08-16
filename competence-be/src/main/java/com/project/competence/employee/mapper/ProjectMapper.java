package com.project.competence.employee.mapper;

import com.project.competence.employee.domain.Project;
import com.project.competence.employee.dto.ProjectResource;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProjectMapper {

    ProjectResource projectToResource(Project project);
}
