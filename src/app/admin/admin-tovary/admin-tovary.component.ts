import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionsService } from 'src/app/shared/services/actions/actions.service';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { IProductResponse } from 'src/app/shared/interfaces/products/products.interface';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';


@Component({
  selector: 'app-admin-tovary',
  templateUrl: './admin-tovary.component.html',
  styleUrls: ['./admin-tovary.component.scss']
})
export class AdminTovaryComponent implements OnInit {

  public adminCategories: Array<ICategoryResponse> = [];
  public adminProducts: Array<IProductResponse> = [];
  public productForm!: FormGroup;

  public editStatus = false;
  public uploadPercent!: number;
  public isUploaded = false;
  private currentCategoryId = 0;

  public openForm = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductsService,
    private storage: Storage
  ) { }

  

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
    this.initProductForm();
  }

  initProductForm(): void {
    this.productForm = this.fb.group({
      category: [null, Validators.required],
      name: [null, Validators.required],
      path: [null, Validators.required],
      ingredient: [null, Validators.required],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      imagePath: [null, Validators.required],
      count: [1]
    });
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe(data => {
      this.adminCategories = data;
      this.productForm.patchValue({
        category: this.adminCategories[0].id
      })
    })
  }

  loadProducts(): void {
    this.productService.getAll().subscribe(data => {
      this.adminProducts = data;
    })
  }


  openFormCheck(): void {
    this.openForm = true;
  }

  closeForm(): void{
    this.openForm = false;
    this.editStatus = false;
    this.productForm.reset();
    this.isUploaded = false;
    this.uploadPercent = 0;
  }


  addProduct(): void {
    if(this.editStatus){
      this.productService.update(this.productForm.value, this.currentCategoryId).subscribe(() => {
        this.loadProducts();
        console.log('edit now');
        
      })
    }else{
      this.productService.create(this.productForm.value).subscribe(() => {
        this.loadProducts();
        console.log('add now');
      })
    }
    this.editStatus = false;
    this.productForm.reset();
    this.isUploaded = false;
    this.uploadPercent = 0;
    this.openForm = false;
  }

  editProduct(product: IProductResponse): void {
    this.productForm.patchValue({
      category: product.category,
      name: product.name,
      ingredient: product.ingredient,
      weight: product.weight,
      price: product.price,
      imagePath: product.imagePath
    });
    this.editStatus = true;
    this.currentCategoryId = product.id;
    this.isUploaded = true;
    this.openForm = true;
  }


  deleteProduct(product: IProductResponse): void {
    if(confirm('Are you sure?')){
      this.productService.delete(product.id).subscribe(() => {
        this.loadProducts();
      })
    }
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('products', file.name, file)
      .then(data => {
        this.productForm.patchValue({
          imagePath: data
        })
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    const path = `${folder}/${name}`;
    let url = '';
    if(file) {
      try {
        const storageRef = ref(this.storage, path)
        const task = uploadBytesResumable(storageRef, file);
        percentage(task).subscribe(data => {
          this.uploadPercent = data.progress;
        })
        await task;
        url = await getDownloadURL(storageRef);
      } catch (e: any) {
        console.log('error', e);
      }
    }else {
      console.log('wrong format');
    }
    return Promise.resolve(url);
  }

  deleteImage(): void {
    const task = ref(this.storage, this.valueByControl('imagePath'));
    deleteObject(task).then(() => {
      console.log('file deleted');
      this.isUploaded = false;
      this.uploadPercent = 0;
      this.productForm.patchValue({
        imagePath: null
      })
    })
  }

  valueByControl(control: string): string {
    return this.productForm.get(control)?.value;
  }

}
