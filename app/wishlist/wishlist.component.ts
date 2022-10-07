import { Component, OnInit } from '@angular/core';
import { WishService } from '../wish.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(private wishServ: WishService) { }

  currentWishList = this.wishServ.getWishList()

  ngOnInit(): void {
  }

  sortedData;
  sortingKey;
  numOfCols = 'four';
  keyword;

  search() {
    this.wishServ.getRawData().then(el => {
      this.sortedData = el.filter(x => {if(x.name.toLowerCase().includes(this.keyword)) return x});
    })
  }

  sort() {
    this.wishServ.getRawData().then(el => {
      if(this.sortingKey=='yeara') el.sort((x,y) => x.year-y.year);
      if(this.sortingKey=='yeard') el.sort((x,y) => y.year-x.year);
      if(this.sortingKey=='namea') el.sort((x,y) => {
        if(x.name>y.name) return 1
        else if(x.name<y.name) return -1
        else return 0
      });
      if(this.sortingKey=='named') el.sort((x,y) => {
        if(x.name<y.name) return 1
        else if(x.name>y.name) return -1
        else return 0
      });
      if(this.sortingKey=='themea') el.sort((x,y) => x.theme_id-y.theme_id);
      if(this.sortingKey=='themed') el.sort((x,y) => y.theme_id-x.theme_id);
      this.sortedData = el;
    })
  }

}
