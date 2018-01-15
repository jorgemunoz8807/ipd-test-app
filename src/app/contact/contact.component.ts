import { Component, OnInit } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private  http: Http) { }
  confirmationString: string ="New Contact has been added";
  isAdded: boolean = false;
  contatctObj: object={};

  addNewContact =function name(contact) {
    this.contatctObj={
      "firstName": contact.firstName,
      "lastName": contact.lastName,
      "address": contact.address,
      "phone": contact.phone
    }
    this.http.post("http://localhost:4201/contacts/",this.contatctObj).subscribe((res:Response)=>{
      this.isAdded = true;
      console.log(res);
    })
  }
  ngOnInit() {
  }

}
