import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryFormComponent } from './categories/category-form/category-form.component';
import { ItemFormComponent } from './shopping/item-form/item-form.component';
import { ListComponent } from './shopping/shopping-list/list.component';

const routes: Routes = [
    {
        path: 'list',
        children: [
            { path: 'add', component: ItemFormComponent },
            { path: 'edit/:id', component: ItemFormComponent },
            { path: '', component: ListComponent },
        ]
    },

    {
        path: 'categories',
        component: CategoriesComponent,
        children: [
            { path: 'add', component: CategoryFormComponent },
            { path: 'edit/:id', component: CategoryFormComponent }
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
