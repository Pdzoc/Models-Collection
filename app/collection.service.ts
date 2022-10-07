import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { db } from './db';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor() { }
  ids = [];
  userCollection = liveQuery(() => db.modelsList.toArray())
  totalParts = 0;

  async add(elem) {
    if(!this.ids.includes(elem.set_num)) {
      this.ids.push(elem.set_num)
      localStorage.setItem('minifigsIds', JSON.stringify(this.ids))
    }
      await db.modelsList.add(elem)
  }

  async remove(elem) {
    this.ids.splice((this.ids.indexOf(elem.set_num)), 1);
    localStorage.setItem('minifigsIds', JSON.stringify(this.ids))
    await db.modelsList.delete(elem.set_num)
  }

  getCollection() {
    return this.userCollection;
  }

  getIds() {
    if(localStorage.getItem('minifigsIds')) {
      this.ids = JSON.parse(localStorage.getItem('minifigsIds'))
    }
    return this.ids.slice();
  }

  getDataForSorting() {
    return db.modelsList.toArray()
  }
}