package com.project.competence.employee.service;

import com.project.competence.employee.domain.repository.SkillRepository;
import com.project.competence.employee.dto.SkillResource;
import com.project.competence.employee.mapper.SkillMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class SkillService {

    private final SkillRepository skillRepository;
    private final SkillMapper skillMapper;

    @Transactional(readOnly = true)
    public List<SkillResource> getAllSkills() {
        log.info("Get all skills");
        return skillRepository
                .findAll()
                .stream()
                .map(skillMapper::skillToSkillResource)
                .toList();
    }
}
