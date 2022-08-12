import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Category } from './category';
import { CategoryService } from './category.service';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
    categories: Category[] = [];
    data: any = {
        name: ''
    }

    constructor(private categoryService: CategoryService, private location: Location) { }

    ngOnInit(): void {
        this._getAllCategories();
    }

    private _getAllCategories(): void {
        this.categoryService.getAllCategories().subscribe(res => {
            if (res.status === 'success') this.categories = res.data!;
        })
    }

    handleSubmit(): void {
        this.categoryService.createNewCategory(this.data).subscribe((res) => {
            if (res.status === 'success') this.location.back();
        })
    }

    removeCategory(id: string) {
        let confirmation = window.confirm('Are you sure you want to remove this category?');
        if (!confirmation) return;

        this.categoryService.deleteCategory(id).subscribe((res) => {
            if (res === null) this._getAllCategories();
        })
    }
}
