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

  async ngOnInit(): Promise<void> {
    this.productId = this.route.snapshot.params['id'];
    if (this.productId) {
      this.isEditMode = true;
      try {
        const product = await this.productService.getProduct(this.productId);
        this.productForm.patchValue(product);
      } catch (err) {
        console.error('Error loading product for edit:', err);
      }
    }
  }

  async onSubmit(): Promise<void> {
    if (this.productForm.valid) {
      const product: Product = this.productForm.value;
      try {
        if (this.isEditMode && this.productId) {
          product.id = this.productId;
          await this.productService.updateProduct(product);
        } else {
          await this.productService.addProduct(product);
        }
        this.router.navigate(['/products']);
      } catch (err) {
        console.error('Error saving product:', err);
      }
    }
  }
}

