import { Component, OnInit } from '@angular/core';
import { Students } from '../../models/students';
import { StudentsService } from '../../services/studentsService/students.service';

import { Route } from '@angular/router';
import { GlobalDateService } from '../../services/globalDateServices/global-date.service';
import { GlobalDate } from '../../models/globalDate';

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
  pageCount: number;
  countOfStudents: number;

  globalDate: GlobalDate[] = [];
  defaultDateForQuery: GlobalDate;

  showModal: boolean = false;
  idStudent: number | undefined;

  constructor(
    private studentsServices: StudentsService,
    private globalDateService: GlobalDateService
  ) {}
  ngOnInit(): void {
    this.getAllDates();
    // this.getAllStudentsWitihNameSubject();
    // this.pageCount = Math.ceil(this.filterStudents.length / this.rows);
    // this.getFinalPrice();
  }

  getAllStudentsWitihNameSubject(startDate: any, endDate: any) {
    this.studentsServices
      .getAllStudentWithNameOfSubjet(startDate, endDate)
      .subscribe((students: any) => {
        this.students = students;
        this.filterStudents = students;
        const uniqueProfessors = new Set<number>();
        students.forEach((students: any) => {
          uniqueProfessors.add(
            students.ImePrezimeUcenika && students.ImeRoditelja
          );
        });
        this.pageCount = Math.ceil(this.filterStudents.length / this.rows);
        this.countOfStudents = uniqueProfessors.size;
      });
  }
  deleteStudent(id: number) {
    this.studentsServices.deleteStudent(id).subscribe(() => {
      window.location.reload();
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
  onPageChange(page: string) {
    if (page == 'predhodna' && this.currentPage > 1) {
      this.currentPage -= 1;
    } else if (page == 'sledeca' && this.currentPage < this.pageCount) {
      this.currentPage += 1;
    }
  }
  applyFilter(searchText: string): void {
    searchText = searchText.toLowerCase();

    this.filterStudents = this.students.filter((student) => {
      return (
        student.ImePrezimeUcenika?.toLowerCase().includes(searchText) ||
        student.nazivPredmeta?.toLowerCase().includes(searchText)
      );
    });
    this.statusFilter = true;
  }
  resetFilter() {
    this.searchText = '';
    this.applyFilter('');
    this.statusFilter = false;
  }

  getAllDates() {
    this.globalDateService.getAllDates().subscribe((dates: any[]) => {
      // Assign the dates to the variable
      this.globalDate = dates;

      // Sort the dates by the full 'azurirano' property in descending order (latest first)
      this.globalDate = this.globalDate.sort((a: any, b: any) => {
        const dateA = new Date(a.azurirano).getTime(); // Get full timestamp
        const dateB = new Date(b.azurirano).getTime(); // Get full timestamp

        return dateB - dateA; // Descending order (latest date first)
      });

      if (this.globalDate.length > 0) {
        this.defaultDateForQuery = this.globalDate[0]; // Get the first element after sorting

        this.getAllStudentsWitihNameSubject(
          this.defaultDateForQuery.pocetakGodine,
          this.defaultDateForQuery.krajGodine
        );
      }
    });
  }

  onClickDelete(idStudent?: number) {
    this.idStudent = idStudent;
    this.showModal = !this.showModal;
  }

  onModalHandle(response: boolean) {
    console.log('Modal response:', response);
    if (response) {
      if (this.idStudent) {
        this.studentsServices.deleteStudent(this.idStudent).subscribe(() => {
          window.location.reload();
        });
      }
    } else {
      this.showModal = !this.showModal;
    }
  }
}
