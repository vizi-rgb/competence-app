package com.project.competence.employee.domain;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    @Enumerated(EnumType.STRING)
    private SkillName name;
}
