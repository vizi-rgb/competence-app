package com.project.competence.employee.domain.repository;

import com.project.competence.employee.domain.Skill;
import com.project.competence.employee.domain.SkillName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {
    Optional<Skill> findByName(SkillName name);
}
