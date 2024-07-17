import { Component, Input } from '@angular/core';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-skills',
  standalone: true,
  imports: [NgForOf, FormsModule],
  templateUrl: './employee-skills.component.html',
  styleUrl: './employee-skills.component.scss',
})
export class EmployeeSkillsComponent {
  @Input({ required: true })
  skills!: string[];

  trackByFn(index: number, item: string) {
    return index;
  }
}
