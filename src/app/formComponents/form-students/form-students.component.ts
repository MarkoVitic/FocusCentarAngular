import { Component, OnInit } from '@angular/core';
import { Students } from '../../models/students';
import { StudentsService } from '../../services/studentsService/students.service';

@Component({
  selector: 'app-form-students',
  templateUrl: './form-students.component.html',
  styleUrl: './form-students.component.css',
})
export class FormStudentsComponent implements OnInit {
  constructor(private studentsServices: StudentsService) {}
  ngOnInit(): void {}
}
