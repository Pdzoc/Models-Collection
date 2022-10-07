import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { db } from './db';

@Injectable({
  providedIn: 'root'
})
export class WishService {

  constructor() { }
  ids = []
  userWish = liveQuery(() => db.wishList.toArray())

  async add(elem) {
    if(!this.ids.includes(elem.set_num)) {
      this.ids.push(elem.set_num)
      localStorage.setItem('wishIds', JSON.stringify(this.ids))
    }
      await db.wishList.add(elem)
  }

  async remove(elem) {
    this.ids.splice((this.ids.indexOf(elem.set_num)), 1);
    localStorage.setItem('wishIds', JSON.stringify(this.ids))
    await db.wishList.delete(elem.set_num)
  }

  getWishList() {
    return this.userWish;
  }

  getRawData() {
    return db.wishList.toArray()
  }
}
