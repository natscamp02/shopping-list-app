import { Category } from "../categories/category";

export class Item {

    constructor(public _id?: string, public name?: string, public category?: Category, public quantity?: number, public cost?: number) { }

}
