import { element } from 'protractor';
import { ChatService } from './../../services/chat.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  texto = '';
  // para desuscribir
  mensajesSubscription: Subscription;
  // array con los mensajes que llegan
  mensajes: any[] = [];
  // para tener en top el scroll de mensajes nuevos
  elemento: HTMLElement;

  constructor(public chatService: ChatService) { }

  ngOnInit() {
    this.elemento = document.getElementById('chat-mensajes');
    // escucha del servidor, nuevos mensajes
    this.chatService.getMessage().subscribe(msg => {
      // adicionar al array de mensajes el nuevo mensaje
      this.mensajes.push( msg );
      // manejo del scroll
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);
    });
  }

  ngOnDestroy() {
    this.mensajesSubscription.unsubscribe();
  }
  // enviar mensaje al servidor
  enviar() {
    // validar si esta vacio el mensaje
    if (this.texto.trim().length === 0) {
      return;
    }
    this.chatService.sendMessage(this.texto);
    this.texto = '';
  }

}
