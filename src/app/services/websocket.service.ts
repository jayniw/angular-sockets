import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public socketStatus = false;
  public usuario: Usuario;

  constructor( private socket: Socket) {
    this.checkStatus();
  }
  // verificar el estado del servidor
  checkStatus() {
    this.socket.on('connect', () => {
      console.log('conectado al servidor');
      this.socketStatus = true;
    });
    this.socket.on('disconnect', () => {
      console.log('desconectado del servidor');
      this.socketStatus = false;
    });
  }
  // emitir un evento al servidor
  emit(event: string, payload?: any, callback?: Function)  {
    this.socket.emit(event, payload, callback);
  }
  // escuchar eventos del servidor
  listen(event: string) {
    return this.socket.fromEvent( event);
  }

  loginWS( nombre: string) {
    console.log('Configurando', nombre);
    this.emit( 'configurar-usuario', { nombre }, resp => {
      console.log(resp);

    });
  }
}
