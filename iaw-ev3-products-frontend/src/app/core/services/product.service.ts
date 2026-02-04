import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Product } from '../../shared/models/product.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products/`;
  products = signal<Product[]>([]);

  private http = inject(HttpClient);

  constructor() {
    this.loadProducts();
  }

  private async loadProducts(): Promise<void> {
    try {
      const data = await firstValueFrom(this.http.get<Product[]>(this.apiUrl));
      this.products.set(data);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getProducts(): Promise<Product[]> {
    try {
      const data = await firstValueFrom(this.http.get<Product[]>(this.apiUrl));
      this.products.set(data);
      return data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async getProduct(id: number): Promise<Product> {
    try {
      return await firstValueFrom(this.http.get<Product>(`${this.apiUrl}${id}`));
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async addProduct(product: Product): Promise<Product> {
    try {
      const newProduct = await firstValueFrom(this.http.post<Product>(this.apiUrl, product));
      this.products.update(products => [...products, newProduct]);
      return newProduct;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async updateProduct(product: Product): Promise<Product> {
    try {
      const updatedProduct = await firstValueFrom(this.http.put<Product>(`${this.apiUrl}${product.id}`, product));
      this.products.update(products =>
        products.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
      );
      return updatedProduct;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async deleteProduct(id: number): Promise<void> {
    try {
      await firstValueFrom(this.http.delete<void>(`${this.apiUrl}${id}`));
      this.products.update(products => products.filter(p => p.id !== id));
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  private handleError(error: any): void {
    console.error('An error occurred:', error);
    // Optionally, you could throw a more specific error or use a global error handling service
    throw new Error('Something bad happened; please try again later.');
  }
}

