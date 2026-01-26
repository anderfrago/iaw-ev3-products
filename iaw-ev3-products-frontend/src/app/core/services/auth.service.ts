import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly TOKEN_KEY = 'auth_token';
    private _token = signal<string | null>(localStorage.getItem(this.TOKEN_KEY));

    public isAuthenticated = computed(() => !!this._token());

    constructor(private router: Router) { }

    getToken(): string | null {
        return this._token();
    }

    login(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
        this._token.set(token);
    }

    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        this._token.set(null);
        this.router.navigate(['/login']);
    }
}
