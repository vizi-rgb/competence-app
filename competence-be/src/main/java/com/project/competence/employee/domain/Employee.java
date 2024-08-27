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
@NamedEntityGraph(
        name = "Employee.allAttributes", includeAllAttributes = true,
        attributeNodes = @NamedAttributeNode(value = "projects", subgraph = "subgraph.projects"),
        subgraphs = {
                @NamedSubgraph(name = "subgraph.projects",
                        attributeNodes = {@NamedAttributeNode(value = "technologies")}
                )
        }

)
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;

    private String surname;

    private LocalDate dateOfEmployment;

    @ManyToOne(fetch = FetchType.LAZY)
    private Employee manager;

    @ManyToMany
    private Set<Skill> skills;

    @ManyToMany
    private Set<Project> projects;
}
