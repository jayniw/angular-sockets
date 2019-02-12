import { WebsocketService } from './../../services/websocket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  nombre = '';
  constructor( public wsService: WebsocketService) { }

  ngOnInit() {
  }

  ingresar() {
    this.wsService.loginWS( this.nombre );
  }

}
