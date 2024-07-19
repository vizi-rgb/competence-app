import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-skills',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee-skills.component.html',
  styleUrl: './employee-skills.component.scss',
})
export class EmployeeSkillsComponent {
  @Input({ required: true })
  skills!: string[];
}
