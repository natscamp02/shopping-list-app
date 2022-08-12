import { Component, OnInit } from '@angular/core';
import { ListService } from '../list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/categories/category.service';
import { Category } from 'src/app/categories/category';

@Component({
    selector: 'app-item-form',
    templateUrl: './item-form.component.html',
    styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {
    action: 'add' | 'edit' = 'add';

    id?: string;
    data: any = {
        name: '',
        category: '',
        quantity: null,
        cost: null
    };
    categories: Category[] = [];

    constructor(private listService: ListService, private categoryService: CategoryService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];
        if (this.id) this._getItemByParamId();

        this._getAllCategories();
    }

    private _getItemByParamId(): void {
        this.listService.getItemById(this.id!).subscribe((res) => {
            if (res.status === 'success') {
                this.data = { ...res.data!, category: res.data!.category?._id };
                this.action = 'edit';
            }
        });
    }

    private _getAllCategories(): void {
        this.categoryService.getAllCategories().subscribe(res => {
            if (res.status === 'success') this.categories = res.data!;
        })
    }

    handleSubmit(): void {
        if (this.action === 'add') {
            this.listService.createNewItem((this.data as any)).subscribe(() => this.router.navigateByUrl('/'));
        }

        if (this.action === 'edit') {
            this.listService.updateItem(this.id!, (this.data as any)).subscribe(() => this.router.navigateByUrl('/'));
        }
    }

}
