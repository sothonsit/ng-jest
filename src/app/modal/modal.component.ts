import { Component, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent {
  message: string = "SUCCESS";

  openModal(msg: string = "SUCCESS") {
    this.message = msg;
    const bsModal = new Modal(document.getElementById('modal') as HTMLElement);
    bsModal.show();
  }

  hideModal() {
    const bsModal = new Modal(document.getElementById('modal') as HTMLElement);
    bsModal.hide();
  }
}
