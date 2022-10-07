import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../collection.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  constructor(private collectionServ: CollectionService) { }

  currentCollection = this.collectionServ.getCollection()
  currentIds = this.collectionServ.ids.length;

  sortedData;
  sortingKey;
  keyword;
  numOfCols = 'four';
  storedParts = 0;

  ngOnInit(): void {
    this.getParts()
  }

  sort() {
    this.collectionServ.getDataForSorting().then(el => {
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

  getParts() {
    this.collectionServ.getDataForSorting().then(el => {
      el.forEach(model => this.storedParts += model.num_parts)
    })
  }

  search() {
    this.collectionServ.getDataForSorting().then(el => {
      this.sortedData = el.filter(x => {if(x.name.toLowerCase().includes(this.keyword)) return x});
    })
  }

}