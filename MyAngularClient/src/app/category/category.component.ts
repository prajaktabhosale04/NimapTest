import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { CategoryService } from './category.service';
import { Category } from './category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'edit', 'delete'];
  dataSource = new MatTableDataSource<any>();

  selectedCategory: Category = new Category();
  loading = false;

  constructor(public categoryService: CategoryService) {
  }

  ngOnInit() {
    this.refresh();
  }

  async refresh() {
    this.loading = true;

    const data = await this.categoryService.getcategories();

    this.dataSource.data = data;
    this.loading = false;
  }

  async updatecategory() {
    if (this.selectedCategory.id !== undefined) {
      await this.categoryService.updatecategory(this.selectedCategory);
    } else {
      await this.categoryService.createcategory(this.selectedCategory);
    }
    this.selectedCategory = new Category();
    await this.refresh();
  }

  editcategory(category: Category) {
    this.selectedCategory = category;
  }

  clearCategory() {
    this.selectedCategory = new Category();
  }

  async deletecategory(category: Category) {
    this.loading = true;
    if (confirm(`Are you sure you want to delete the category ${category.name}. This cannot be undone.`)) {
      await this.categoryService.deletecategory(category.id);
    }
    await this.refresh();
  }
}
