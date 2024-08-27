package com.project.competence.employee.service;

import com.project.competence.employee.domain.repository.ProjectRepository;
import com.project.competence.employee.dto.ProjectResource;
import com.project.competence.employee.mapper.ProjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;

    @Transactional(readOnly = true)
    public List<ProjectResource> getAllProjects() {
        return projectRepository
                .findAll()
                .stream()
                .map(projectMapper::projectToResource)
                .toList();
    }
}
