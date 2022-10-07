import Dexie, { Table } from 'dexie';

export class AppDB extends Dexie {
    modelsList;
    wishList;
    
    constructor() {
        super('ngdexieliveQuery');
        this.version(2).stores({
            modelsList: 'set_num, year, name, set_img_url',
            wishList: 'set_num, year, name, set_img_url'
        })
    }
}

export const db = new AppDB();