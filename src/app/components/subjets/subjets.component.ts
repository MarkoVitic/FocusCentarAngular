import { Component, OnInit } from '@angular/core';
import { Subjets } from '../../models/subjets';
import { SubjetsService } from '../../services/subjetsService/subjets.service';

@Component({
  selector: 'app-subjets',
  templateUrl: './subjets.component.html',
  styleUrl: './subjets.component.css',
})
export class SubjetsComponent implements OnInit {
  subjets: Subjets[] = [];

  constructor(private subjetService: SubjetsService) {}
  ngOnInit(): void {
    this.getAllSubjets();
  }

  getAllSubjets() {
    this.subjetService.getAllSubjets().subscribe((subjets: any) => {
      this.subjets = subjets;
    });
  }
  deleteSubject(id: number) {
    this.subjetService.deleteSubjet(id).subscribe();
  }
}
