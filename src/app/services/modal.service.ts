import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalRef: any;

  constructor(private modalService: NgbModal) { }

  modal(component: any, id: number | undefined){
    const data = {id: id}
    this.modalRef = this.modalService.open(component,  { size: 'xl' })
    this.modalRef.componentInstance.data = data
  }

}
