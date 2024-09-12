import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Professors } from '../../models/professors';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrl: './modals.component.css',
})
export class ModalsComponent {
  @Input() professor: Professors = new Professors();
  @Output() handleModal: EventEmitter<boolean> = new EventEmitter();

  handleChange(response: boolean) {
    this.handleModal.emit(response);
  }
}
