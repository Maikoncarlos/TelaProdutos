import { Component, OnInit, Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({providedIn: 'root'})
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  alertTimer(icon: any, title: any) {
    Swal.fire({ icon: icon, title: title, showConfirmButton: false, timer: 2000 })
  }

}
