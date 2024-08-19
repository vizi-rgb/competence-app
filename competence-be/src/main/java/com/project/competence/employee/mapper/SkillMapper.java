package com.project.competence.employee.mapper;

import com.project.competence.employee.domain.Skill;
import com.project.competence.employee.domain.SkillName;
import com.project.competence.employee.domain.repository.SkillRepository;
import com.project.competence.employee.dto.SkillResource;
import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring")
public abstract class SkillMapper {
    private SkillRepository skillRepository;

    @Autowired
    public void setSkillRepository(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    public abstract SkillResource skillToSkillResource(Skill skill);

    public Skill skillNameToSkill(SkillName skillName) {
        return skillRepository.findByName(skillName).orElse(null);
    }

}
