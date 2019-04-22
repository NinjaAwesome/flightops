import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { interval } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import * as io from "socket.io-client";
import * as $ from 'jquery';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  zuluTime: any;
  localTime: any;
  user: any;
  joinned: boolean = false;
  newUser = { email: '', room: '' };
  msgData = { room: '', email: '', message: '' };
  socket = io('http://104.238.148.111:4000');
  chats: [];

  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private router: Router
    ) { }

  ngOnInit() {

    this.authService.me().subscribe(user => {
      this.user = user.user;
      this.chats = []
      this.newUser.email = this.user.email;
      this.newUser.room = 'General';
      if (this.joinned !== true) {
        this.joinRoom();
      }
      var user = JSON.parse(localStorage.getItem("user"));
      if (user !== null) {
        this.getChatByRoom(user.room);
        this.msgData = { room: user.room, email: user.email, message: '' }
        this.joinned = true;
        this.scrollToBottom();
      }
      this.socket.on('new-message', function (data) {
        console.log('new message', data)
        console.log('new message', JSON.parse(localStorage.getItem("user")))
        data.message.email = this.user.email;
      var user = JSON.parse(localStorage.getItem("user"));
      if (data.message.room === JSON.parse(localStorage.getItem("user")).room) {
          this.chats.push(data.message);
          this.msgData = { room: user.room, email: user.email, message: '' }
          this.scrollToBottom();
        }
        var user = JSON.parse(localStorage.getItem("user"));
        this.getChatByRoom(user.room);
      }.bind(this));
    })
}

  joinRoom() {
    var date = new Date();
    localStorage.setItem("user", JSON.stringify(this.newUser));
    this.getChatByRoom(this.newUser.room);
    this.msgData = { room: this.newUser.room, email: this.newUser.email, message: '' };
    this.joinned = true;
    this.socket.emit('save-message', { room: this.newUser.room, email: this.newUser.email, message: 'Join this room', updated_at: date });
  }

  sendMessage() {
    this.adminService.saveChat(this.msgData).subscribe(data => {
      console.log('savee ', data)
      this.msgData.message = '';
      this.socket.emit('save-message', data);
    });
  }
  getChatByRoom(room) {
    this.adminService.getChatByRoom(room).subscribe(data => {
      this.chats = data.data;
      console.log('chats ', this.chats)
    })
  }
  hideChat(): void {
    $('#chatCon').addClass('is-hidden');
    $('#chatBtn').removeClass('is-hidden');
  }
  showChat(): void {
    $('#chatCon').removeClass('is-hidden');
    $('#chatBtn').addClass('is-hidden');
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
  

}
