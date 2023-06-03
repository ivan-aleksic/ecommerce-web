import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { OKTA_AUTH } from '@okta/okta-angular';

import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userFullName: string = "";

  storage: Storage = sessionStorage;

  constructor(private oktaAuthService: OktaAuthStateService, 
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

  ngOnInit(): void {

    this.oktaAuthService.authState$.subscribe(
      (result) => {
        this.isAuthenticated = result.isAuthenticated;
        this.getUserDetails();
      }
    );
  }

getUserDetails() {
    if (this.isAuthenticated) {

      this.oktaAuth.getUser().then(
        (res) => {
          this.userFullName = res.name;

          // retrieving the user's email from authentication response
          const theEmail = res.email;

          // storing the email in browser storage
          this.storage.setItem('userEmail', JSON.stringify(theEmail)); // key = userEmail, value = JSON.stringify(theEmail) - stringify version of email
        }
      );
    }
  }

  logout(){
    // Terminates the session with Okta and removes current tokens.
    this.oktaAuth.signOut();
  }
}
