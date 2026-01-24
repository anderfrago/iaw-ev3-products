import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../shared/models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);

  productForm: FormGroup;
  isEditMode = false;
  productId: number | null = null;

  constructor() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      image: [''],
      price: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    if (this.productId) {
      this.isEditMode = true;
      this.productService.getProduct(this.productId).subscribe({
        next: (product) => this.productForm.patchValue(product),
        error: (err) => console.error('Error loading product for edit:', err)
      });
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const product: Product = this.productForm.value;
      if (this.isEditMode && this.productId) {
        product.id = this.productId;
        this.productService.updateProduct(product).subscribe({
          next: () => this.router.navigate(['/products']),
          error: (err) => console.error('Error updating product:', err)
        });
      } else {
        this.productService.addProduct(product).subscribe({
          next: () => this.router.navigate(['/products']),
          error: (err) => console.error('Error adding product:', err)
        });
      }
    }
  }
}

