package com.project.competence.employee.dto;

import java.util.List;

public record ProjectResource(
        String title,
        String description,
        List<SkillResource> technologies
) {
}
