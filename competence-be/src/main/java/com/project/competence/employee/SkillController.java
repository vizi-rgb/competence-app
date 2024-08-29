package com.project.competence.employee;

import com.project.competence.employee.dto.SkillResource;
import com.project.competence.employee.service.SkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/skills")
public class SkillController {

    private final SkillService skillService;

    @GetMapping
    public ResponseEntity<List<SkillResource>> getAllSkills() {
        return ResponseEntity.ok(skillService.getAllSkills());
    }
}
