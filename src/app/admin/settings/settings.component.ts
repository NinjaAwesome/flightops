import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AdminService } from '../admin.service';
import { FormControl, ValidationErrors, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  crewTemplate: any;
  handlerTemplate: any;

  constructor(private adminService: AdminService) { }

  users: {};
  ngOnInit() {
    this.getTemplates()
    $('#btn-add-user').on('click', function () {
      $('#add-user').addClass('is-active');
    })
    $('.delete').on('click', function () {
      $('#add-user').removeClass('is-active');
    })
    this.getUsers();
  }
  getUsers(): void {
    this.adminService.getUsers().subscribe(data => {
      this.users = data.data;
      console.log('crews ', this.users)
    })
  }

  passwordsMatchValidator(control: FormControl): ValidationErrors {
    let password = control.root.get('password');
    return password && control.value !== password.value ? {
      passwordMatch: true
    } : null;
  }

  userForm = new FormGroup({
    fullname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    repeatPassword: new FormControl('', [Validators.required, this.passwordsMatchValidator])
  })

  get fullname(): any { return this.userForm.get('fullname'); }
  get email(): any { return this.userForm.get('email'); }
  get password(): any { return this.userForm.get('password'); }
  get repeatPassword(): any { return this.userForm.get('repeatPassword'); }

  getTemplates(): void {
    this.adminService.getTemplates().subscribe(data => {
      this.crewTemplate = data.data[0]
      this.handlerTemplate = data.data[1]
      console.log('get templates ', this.crewTemplate)
    })
  }
  saveHandler(): void {
    this.adminService.updateTemplate(this.handlerTemplate._id, this.handlerTemplate.subject, this.handlerTemplate.message).subscribe(data => {
      
      console.log('update ', data)
    })
  }
  saveCrew(): void {
    this.adminService.updateTemplate(this.crewTemplate._id, this.crewTemplate.subject, this.crewTemplate.message).subscribe(data => {
      
      console.log('update ', data)
    })
  }
  handleHandlerChange(value): void {
    this.handlerTemplate.message = value;
    console.log(value)
    console.log(this.handlerTemplate.message)
  }
  handleCrewChange(value): void {
    this.crewTemplate.message = value;
  }
  register() {

    if (!this.userForm.valid) return;

    let {
      fullname,
      email,
      password,
      repeatPassword
    } = this.userForm.getRawValue();

    this.adminService.addUser(fullname, email, password, repeatPassword, "admin", "")
      .subscribe(data => {
        console.log('new user ', data)
      })
  }



}
