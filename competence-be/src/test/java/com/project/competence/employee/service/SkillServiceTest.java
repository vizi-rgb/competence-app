package com.project.competence.employee.service;

import com.project.competence.employee.domain.Skill;
import com.project.competence.employee.domain.SkillName;
import com.project.competence.employee.domain.repository.SkillRepository;
import com.project.competence.employee.dto.SkillResource;
import com.project.competence.employee.mapper.SkillMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class SkillServiceTest {

    @Mock
    private SkillMapper skillMapper;

    @Mock
    private SkillRepository skillRepository;

    @InjectMocks
    private SkillService underTest;

    @Test
    void givenNoSkillsInRepositoryShouldReturnEmptyList() {
        // given
        when(skillRepository.findAll()).thenReturn(List.of());

        // when
        final var skills = underTest.getAllSkills();

        // then
        assertThat(skills).isEmpty();
    }

    @Test
    void givenSkillsInRepositoryShouldReturnSkills() {
        // given
        final var skill = provideSimpleSkill();
        final var skillResource = provideSkillResource(skill);
        when(skillRepository.findAll()).thenReturn(List.of(skill));
        when(skillMapper.skillToSkillResource(skill)).thenReturn(skillResource);

        // when
        final var skills = underTest.getAllSkills();

        // then
        assertThat(skills).isNotEmpty().hasSize(1).contains(skillResource);
    }

    private Skill provideSimpleSkill() {
        return new Skill(1L, SkillName.ANGULAR);
    }

    private SkillResource provideSkillResource(Skill skill) {
        return new SkillResource(skill.getName());
    }


}