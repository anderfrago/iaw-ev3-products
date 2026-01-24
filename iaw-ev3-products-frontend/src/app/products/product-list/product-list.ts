import { Component, inject } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../shared/models/product.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductListComponent {
  productService = inject(ProductService);
  products = this.productService.products;

  async deleteProduct(id: number | undefined): Promise<void> {
    if (id !== undefined) {
      try {
        await this.productService.deleteProduct(id);
        console.log('Product deleted successfully');
      } catch (err) {
        console.error('Error deleting product:', err);
      }
    }
  }
}

