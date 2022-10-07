import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../collection.service';
import { WishService } from '../wish.service';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  constructor(private reqServ: RequestService, private collectionServ: CollectionService, private wishServ: WishService) { }

  ngOnInit(): void {
    this.storedIds = this.collectionServ.getIds();
    this.collectionServ.getCollection().subscribe(el => this.storedModels.push(...el));
    this.wishServ.getWishList().subscribe(el => this.wishModels.push(...el))
  }

  allData = [];
  storedModels = [];
  wishModels = [];
  storedIds = [];
  page = 1;
  minYear = 1949;
  maxYear = new Date().getFullYear();
  numOfCols = 'four';
  changingPage = false;
  onlyLS = false;
  excludedThemes = [1,3,4,16,17,18,19,20,21,158,171,209,246,254,255,256,257,258,259,260,261,262,263,264,269,270,271,272,274,275,279,280,287,315,317,318,324,341,360,364,388,390,401,435,439,440,443,448,453,456,459,461,494,498,500,501,502,504,505, 506,507, 516,521,524,525,529,576,577,592,593,595,596,600,615,616, 626, 627, 628, 629, 630, 631, 632, 633, 634, 635, 638, 639, 640, 641, 647, 648, 651, 652, 653, 657, 658, 659, 660, 661, 662, 663, 664, 665, 666,667,668,696,697,700,701,702,703,704,705,706,707,708,710,713,721, 722, 724,737,739,740,742]
  themeID: number;
  keyword: string;
  next: string;
  prev: string;
  
  getModel(page?:number, url?:string, factor?:number) {
    this.storedIds = this.collectionServ.getIds();
    this.changingPage = false;
    if(typeof factor=='number') this.page += factor;
    this.next = "";
    this.prev = "";
    this.reqServ.getData(this.minYear, this.maxYear, url, page).subscribe(el => {
      if(el.next) {
        this.next = el.next;
      }
      if(el.previous) this.prev = el.previous;
      this.allData = [];
      el.results.forEach(model => {
        if(!this.onlyLS) this.allData.push(model)
        else {
          if(!this.excludedThemes.includes(model.theme_id)) this.allData.push(model)
        }
      })
    })
    }

  getID(id:number) {
    this.changingPage = false;
    this.reqServ.getID(id, this.minYear, this.maxYear).subscribe(el => {
      this.page = 1;
      this.next = "";
      this.prev = "";
      if(el.next) this.next = el.next;
      if(el.previous) this.prev = el.previous;
      this.allData = [];
      el.results.forEach(model => {
        this.allData.push(model)
      })
    }, error => {console.log(error)})
  }

  search(keyword) {
    this.changingPage = false;
    this.page = 1;
    this.reqServ.searchKeyword(keyword, this.minYear, this.maxYear).subscribe(el => {
      this.next = "";
      this.prev = "";
      if(el.next) this.next = el.next;
      if(el.previous) this.prev = el.previous;
      this.allData = [];
      el.results.forEach(model => {
        if(!this.onlyLS) this.allData.push(model)
        else {
          if(!this.excludedThemes.includes(model.theme_id)) this.allData.push(model)
        }
      })
    })
  }

  compare(elem, collection) {
    if(collection)  return this.storedModels.some(el => el.set_num==elem.set_num);
    else return this.wishModels.some(el => el.set_num==elem.set_num);
  }

  getRandom() {
    this.allData=[];
    let models = []
    this.reqServ.getRandom().subscribe(
    { 
      next: (el) => models.push(...el.results),
      complete: () => {
        models = models.filter(el => el.set_img_url)
        models.sort(()=> Math.random() - .5);
        this.allData.push(models[0])
      }
    }
    );
  }
}