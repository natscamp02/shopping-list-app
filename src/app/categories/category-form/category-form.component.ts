import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../category.service';

@Component({
    selector: 'app-category-form',
    templateUrl: './category-form.component.html',
    styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
    action: 'add' | 'edit' = 'add';

    id?: string;
    data: any = {
        name: ''
    }

    constructor(private categoryService: CategoryService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];

        if (this.id) {
            this.categoryService.getCategoryById(this.id).subscribe(res => {
                if (res.status === 'success') this.data = res.data!;
            });
            this.action = 'edit';
        }
    }

    handleSubmit(): void {
        if (this.action === 'add')
            this.categoryService.createNewCategory(this.data).subscribe((res) => {
                if (res.status === 'success') this.back();
            });

        if (this.action === 'edit')
            this.categoryService.updateCategory(this.id!, this.data).subscribe((res) => {
                if (res.status === 'success') this.back();
            });
    }

    back() {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigateByUrl('/categories');
    }
}
