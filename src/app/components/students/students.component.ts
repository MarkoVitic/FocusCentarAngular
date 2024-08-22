import { Component, OnInit } from '@angular/core';
import { Students } from '../../models/students';
import { StudentsService } from '../../services/studentsService/students.service';

import { Route } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css',
})
export class StudentsComponent implements OnInit {
  students: Students[] = [];

  constructor(private studentsServices: StudentsService) {}
  ngOnInit(): void {
    this.getAllStudentsWitihNameSubject();
    this.getFinalPrice();
  }

  getAllStudentsWitihNameSubject() {
    this.studentsServices
      .getAllStudentWithNameOfSubjet()
      .subscribe((students: any) => {
        this.students = students;
      });
  }
  deleteStudent(id: number) {
    this.studentsServices.deleteStudent(id).subscribe();
  }

  getFinalPrice() {
    this.students = this.students.map((student: Students) => {
      if (student.popust && student.ukupnaCijenaPrograma) {
        student.ukupnaCijenaPrograma -=
          (student.ukupnaCijenaPrograma * student.popust) / 100;
      }
      return student;
    });
  }
}
