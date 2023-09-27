import { Component, OnInit } from '@angular/core';
import { getUser } from 'src/app/common/common';

@Component({
	selector: 'app-login-status',
	templateUrl: './login-status.component.html',
	styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {
	isAuthenticated: boolean = false;
	userFullName: string = "";

	async ngOnInit() {
		const user = await getUser();
		if (user) {
			this.isAuthenticated = true;
			this.userFullName = user.username;
		}
	}

	logout() {
		document.cookie = `user=; expires=${new Date(1)}`;
		window.location.href = '/';
	}
}
