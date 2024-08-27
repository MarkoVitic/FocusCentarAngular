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
  filterStudents: Students[] = [];
  searchText: string;
  statusFilter: boolean = false;

  currentPage: number = 1;
  rows: number = 10;

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
        this.filterStudents = students;
      });
  }
  deleteStudent(id: number) {
    this.studentsServices.deleteStudent(id).subscribe(() => {
      window.location.reload();
    });
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

  displayList(page: number) {
    const strat = this.rows * (page - 1);
    const end = strat + this.rows;
    return this.filterStudents.slice(strat, end);
  }

  setPagination() {
    const pageCount = Math.ceil(this.filterStudents.length / this.rows);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }
  onPageChange(page: number) {
    this.currentPage = page;
  }
  applyFilter(searchText: string): void {
    searchText = searchText.toLowerCase();

    this.filterStudents = this.students.filter((student) => {
      return (
        student.ImePrezimeUcenika.toLowerCase().includes(searchText) ||
        student.nazivPredmeta.toLowerCase().includes(searchText)
      );
    });
    this.statusFilter = true;
  }
  resetFilter() {
    this.searchText = '';
    this.applyFilter('');
    this.statusFilter = false;
  }
}
