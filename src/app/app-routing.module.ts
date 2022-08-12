import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemFormComponent } from './shopping/item-form/item-form.component';
import { ListComponent } from './shopping/list/list.component';

const routes: Routes = [
    {
        path: 'list',
        children: [
            { path: 'add', component: ItemFormComponent },
            { path: 'edit/:id', component: ItemFormComponent },
            { path: '', component: ListComponent },
        ]
    },

    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
