import { Component, OnInit } from '@angular/core';
import { ListService } from '../list.service';
import { Item, PartialItem } from '../item';
import { ActivatedRoute, Router } from '@angular/router';

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

    constructor(private listService: ListService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];

        if (this.id) {
            this.listService.getItemById(this.id).subscribe((res) => {
                if (res.status === 'success') {
                    this.data = { ...res.data!, _id: undefined };
                    this.action = 'edit';

                    console.log(this.data);
                }
            });
        }
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
