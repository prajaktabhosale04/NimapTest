import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ProductsService } from './products.service';
import { Product } from './product';
import { CategoryService } from '../category/category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'categoryId', 'categoryName', 'edit', 'delete'];
  dataSource = new MatTableDataSource<any>();

  selectedProduct: Product = new Product();
  loading = false;
  categoryList: any[] = [];
  selectedValue: any = 0;
  constructor(public productService: ProductsService, public categoryService: CategoryService) {
  }

  ngOnInit() {
    this.refresh();
    this.getCategories();

  }
  async getCategories() {
    this.categoryList = await this.categoryService.getcategories();
  }

  async refresh() {
    this.loading = true;

    const data = await this.productService.getProducts();
    this.selectedValue = 0;
    this.dataSource.data = data;
    this.loading = false;
  }

  async updateProduct() {
    if (this.selectedProduct.id !== undefined) {
      await this.productService.updateProduct(this.selectedProduct);
    } else {
      await this.productService.createProduct(this.selectedProduct);
    }
    this.selectedProduct = new Product();
    await this.refresh();
  }

  editProduct(product: Product) {
    this.selectedProduct = product;
    this.selectedValue = this.selectedProduct.categoryid;
  }

  clearProduct() {
    this.selectedProduct = new Product();
    this.selectedValue = 0;
  }

  async deleteProduct(product: Product) {
    this.loading = true;
    if (confirm(`Are you sure you want to delete the product ${product.name}. This cannot be undone.`)) {
      await this.productService.deleteProduct(product.id);
    }
    await this.refresh();
  }

  assignValue(value) {
    this.selectedValue = value;
    this.selectedProduct.categoryid = value;
  }
}
