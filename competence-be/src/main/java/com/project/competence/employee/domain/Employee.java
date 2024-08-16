package com.project.competence.employee.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;

    private String surname;

    private LocalDate dateOfEmployment;

    @ManyToOne
    private Employee manager;

    @ManyToMany
    private Set<Skill> skills;

    @ManyToMany
    private Set<Project> projects;
}
