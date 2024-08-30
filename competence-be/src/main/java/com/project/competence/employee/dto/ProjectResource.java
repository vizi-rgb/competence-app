package com.project.competence.employee.dto;

import lombok.Builder;

import java.util.List;

@Builder
public record ProjectResource(
        String title,
        String description,
        List<SkillResource> technologies
) {
}
