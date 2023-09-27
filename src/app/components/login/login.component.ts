import { Component } from '@angular/core';
import { API_URL } from 'src/app/common/common';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {
	DEFAULT_HEADERS = {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		'Accept-Encoding': 'gzip, deflate, br',
	}
	GET_OPTIONS = {
		method: 'GET',
		headers: this.DEFAULT_HEADERS,
	}
	POST_OPTIONS = {
		method: 'POST',
		headers: this.DEFAULT_HEADERS,
	}

	username: string = '';
	email: string = '';
	password: string = '';

	async doSignUp() {
		const url = `${API_URL}/user/register`;
		const data = {
			username: this.username,
			email: this.email,
			password: this.password
		};

		const res = await fetch(url, {
			...this.POST_OPTIONS,
			body: JSON.stringify(data)
		});
		if (res.status !== 200) {
			// Registration failed
			return;
		}
		const returnData = await res.text();

		let cookieExpiry = new Date();
		cookieExpiry.setHours(cookieExpiry.getHours() + 1);
		document.cookie = `user=${returnData}; expires=${cookieExpiry.toUTCString()}`;
		window.location.href = '/';
	}

	async doLogin() {
		const url = `${API_URL}/user/login?email=${this.email}&password=${this.password}`;

		const res = await fetch(url, this.GET_OPTIONS);
		if (res.status !== 200) {
			// Authentication failed
			return;
		}
		const returnData = await res.text();

		let cookieExpiry = new Date();
		cookieExpiry.setHours(cookieExpiry.getHours() + 1);
		document.cookie = `user=${returnData}; expires=${cookieExpiry.toUTCString()}`;
		window.location.href = '/';
	}
}
