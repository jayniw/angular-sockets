import { WebsocketService } from './websocket.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(public wsService: WebsocketService) { }

  sendMessage(mensaje: string) {
    const payload = {
      de: 'Jalo',
      cuerpo: mensaje
    };

    this.wsService.emit('mensaje', payload);
  }

  getMessage() {
    return this.wsService.listen('mensaje-nuevo');
  }
}
