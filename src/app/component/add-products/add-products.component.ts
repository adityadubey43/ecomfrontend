import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private userservices: UserService) {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      productDesc: ['', Validators.required],
      productImages: [[], Validators.required],
      Indprice: [0, [Validators.required, Validators.min(0)]],
      USAprice: [0, [Validators.required, Validators.min(0)]],
      UKprice: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      stockQuantity: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.userservices.addProduct(this.productForm.value).subscribe(
        () => {
          alert("product added successfully");
          this.productForm.reset();
        },
        error => {
          console.error('Error adding product:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

}
