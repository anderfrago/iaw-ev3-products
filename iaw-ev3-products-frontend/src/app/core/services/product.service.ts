import { Injectable, signal } from '@angular/core';
import { Observable, from, map, tap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../../shared/models/product.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/api/products`;
  products = signal<Product[]>([]);

  constructor() {
    this.loadProducts();
  }

  private async loadProducts(): Promise<void> {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Product[] = await response.json();
      this.products.set(data);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }

  getProducts(): Observable<Product[]> {
    return from(fetch(this.apiUrl)).pipe(
      catchError(this.handleError),
      map(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      }),
      map(data => {
        this.products.set(data);
        return data;
      }),
      catchError(this.handleError)
    );
  }

  getProduct(id: number): Observable<Product> {
    return from(fetch(`${this.apiUrl}/${id}`)).pipe(
      catchError(this.handleError),
      map(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      }),
      catchError(this.handleError)
    );
  }

  addProduct(product: Product): Observable<Product> {
    return from(fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })).pipe(
      catchError(this.handleError),
      map(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      }),
      tap((newProduct) => this.products.update(products => [...products, newProduct])),
      catchError(this.handleError)
    );
  }

  updateProduct(product: Product): Observable<Product> {
    return from(fetch(`${this.apiUrl}/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })).pipe(
      catchError(this.handleError),
      map(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      }),
      tap((updatedProduct) => this.products.update(products =>
        products.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
      )),
      catchError(this.handleError)
    );
  }

  deleteProduct(id: number): Observable<void> {
    return from(fetch(`${this.apiUrl}/${id}`, {
      method: 'DELETE'
    })).pipe(
      catchError(this.handleError),
      map(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return;
      }),
      tap(() => this.products.update(products => products.filter(p => p.id !== id))),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
