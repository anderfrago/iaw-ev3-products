import { Injectable, signal } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products/`;
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
      this.handleError(error);
    }
  }

  async getProducts(): Promise<Product[]> {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Product[] = await response.json();
      this.products.set(data);
      return data;
    } catch (error) {
      this.handleError(error);
      throw error; // Re-throw to propagate the error
    }
  }

  async getProduct(id: number): Promise<Product> {
    try {
      const response = await fetch(`${this.apiUrl}${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async addProduct(product: Product): Promise<Product> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const newProduct: Product = await response.json();
      this.products.update(products => [...products, newProduct]);
      return newProduct;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async updateProduct(product: Product): Promise<Product> {
    try {
      const response = await fetch(`${this.apiUrl}${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedProduct: Product = await response.json();
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
      const response = await fetch(`${this.apiUrl}${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
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

