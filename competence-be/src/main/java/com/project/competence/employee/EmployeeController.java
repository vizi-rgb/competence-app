package com.project.competence.employee;

import com.project.competence.employee.dto.CreateEmployeeRequest;
import com.project.competence.employee.dto.EmployeeCompactResource;
import com.project.competence.employee.dto.EmployeeResource;
import com.project.competence.employee.dto.PartiallyUpdateEmployeeRequest;
import com.project.competence.employee.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping
    public ResponseEntity<List<EmployeeCompactResource>> getEmployees() {
        return ResponseEntity.ok(employeeService.getEmployees());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResource> getEmployee(@PathVariable UUID id) {
        return ResponseEntity.ok(employeeService.getEmployee(id));
    }

    @GetMapping("/{id}/managers")
    public ResponseEntity<List<EmployeeCompactResource>> getEmployeeManagers(@PathVariable UUID id) {
        return ResponseEntity.ok(employeeService.getEmployeeAvailableManagers(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<EmployeeCompactResource>> searchEmployees(
            @RequestParam(defaultValue = "") String name, @RequestParam(defaultValue = "") String surname
    ) {
        return ResponseEntity.ok(employeeService.searchEmployees(name, surname));
    }

    @PostMapping
    public ResponseEntity<Void> createEmployee(@RequestBody @Valid CreateEmployeeRequest request) {
        employeeService.createEmployee(request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable UUID id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateEmployee(@PathVariable UUID id, @RequestBody @Valid CreateEmployeeRequest request) {
        employeeService.updateEmployee(id, request);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> partiallyUpdateEmployee(@PathVariable UUID id, @RequestBody @Valid PartiallyUpdateEmployeeRequest request) {
        employeeService.partiallyUpdateEmployee(id, request);
        return ResponseEntity.noContent().build();
    }
}
