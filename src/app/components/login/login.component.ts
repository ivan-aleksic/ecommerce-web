import { Component } from '@angular/core';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {
	userEmail: string;
	email: string;

	doUpdate() {
		console.log(this.userEmail);
	}
}
