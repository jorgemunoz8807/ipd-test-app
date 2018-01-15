import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.component.html',
  styleUrls: ['./update-contact.component.css'],
  styles: ["../node_modules/bootstrap/dist/css/bootstrap.min.css",
    "styles.css"]
})
export class UpdateContactComponent implements OnInit {

  id: number;
  data: object = {};
  contacts = [];
  contactObj: object = {};
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private router: Router, private route: ActivatedRoute, private http: Http) { }

  updateContact(contact) {
    this.contactObj = {
      "firstName": contact.firstName,
      "lastName": contact.lastName,
      "address": contact.address,
      "phone": contact.phone
    };
    const url = `${"http://localhost:4201/contacts"}/${this.id}`;

    this.http.put(url, JSON.stringify(this.contactObj), { headers: this.headers })
      .toPromise()
      .then(() => {
        this.router.navigate(['/']);
      })
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });



    this.http.get("http://localhost:4201/contacts").subscribe(
      (res: Response) => {
        this.contacts = res.json();
        for (var i = 0; i < this.contacts.length; i++) {
          if (parseInt(this.contacts[i].id) === this.id) {
            this.data = this.contacts[i];
            break;
          }
        }
      }
    )
  }

}
