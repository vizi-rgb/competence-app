package com.project.competence.employee.mapper;

import com.project.competence.employee.domain.Skill;
import com.project.competence.employee.dto.SkillResource;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SkillMapper {

    SkillResource skillToSkillResource(Skill skill);
}
