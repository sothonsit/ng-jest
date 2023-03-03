import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent {

  @Input('message') message!: string;

  openModal() {
    const bsModal = new bootstrap.Modal(document.getElementById('modal') as HTMLElement);
    bsModal.show();
  }
}
