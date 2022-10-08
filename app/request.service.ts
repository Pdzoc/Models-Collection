import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Model } from './model'

interface Models {
  count: number,
  previous: string,
  next: string,
  results: Model[]
}

interface Theme {
  id: number, 
  parent_id: any, 
  name: string
}

interface Themes {
  count: number,
  previous: string,
  next: string,
  results: Theme[]
}

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(private http: HttpClient) { }

 

  apiKey = 'key=';
  base = 'https://rebrickable.com/api/v3/lego/';
  urlPrev = '';
  urlNext = '';


  getData(minYear, maxYear, url?:string, page?:number) {
    if(!page) page=1;
    if(!url)  return this.http.get<Models>(this.base+'sets/?'+this.apiKey+"&min_year="+minYear+"&max_year="+maxYear+'&page='+page)
    else return this.http.get<Models>(url)
  }

  getID(id, minYear, maxYear) {
    return this.http.get<Models>(this.base+'sets/?'+this.apiKey+'&theme_id='+id+"&min_year="+minYear+"&max_year="+maxYear)
  }

  searchKeyword(keyword, minYear, maxYear) {
    return this.http.get<Models>(this.base+'sets/?'+this.apiKey+'&search='+keyword+"&min_year="+minYear+"&max_year="+maxYear)
  }

  getThemes(page) {
    return this.http.get<Themes>(this.base+'themes/?'+this.apiKey+'&page='+page)
  }

  getRandom() {
    let num = ~~(Math.random() * (125-1) + 1)
    return this.http.get<Models>(this.base+'sets/?'+this.apiKey+'&page='+num)
  }
}
