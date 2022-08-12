import { Component, OnInit } from '@angular/core';
import { ListService } from '../list.service';
import { Item } from '../item';
import { ApiResponse } from 'src/app/api-response';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    list: Item[] = [];

    constructor(private listService: ListService) { }

    ngOnInit(): void {
        this._getAllItems();
    }

    private _getAllItems(): void {
        this.listService.getAllItems().subscribe((res: ApiResponse) => {
            if (res.status === 'success') this.list = res.data;
        });
    }

    updateQuantity(item: Item, amount: -1 | 1): void {
        const newQuantity = amount === -1 ? Math.max(item.quantity! + amount, 1) : Math.min(item.quantity! + amount, 999);

        this.listService.updateItem(item._id!, { ...item, quantity: newQuantity }).subscribe((res) => {
            if (res.status === 'success') this._getAllItems();
        })
    }

    removeItem(id: string) {
        let confirmation = window.confirm('Are you sure you want to remove this item?');
        if (!confirmation) return;

        this.listService.deleteItem(id).subscribe((res: ApiResponse) => {
            if (res === null) this._getAllItems();
        })
    }
}
