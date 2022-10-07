import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { CollectionService } from '../collection.service';
import { WishService } from '../wish.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {

  constructor(private collectionServ: CollectionService, private wishServ: WishService, private el: ElementRef) { }

  ngOnInit(): void {
  }

  @Input() model;
  @Input() isCollection;
  @Input() isWish;
  addingFlag = true;
  bigPict;

  onAdd(elem) {
    this.collectionServ.add(elem);
    this.collectionServ.totalParts += elem.num_parts;
    this.addingFlag = !this.addingFlag;
  }

  onAddWish(elem) {
    this.wishServ.add(elem)
  }

  onRemove(elem) {
    this.el.nativeElement.classList.remove('have');
    this.isCollection = false;
    this.collectionServ.remove(elem);
    this.collectionServ.totalParts -= elem.num_parts;
    this.addingFlag = !this.addingFlag
  }

  onRemoveWish(elem) {
    this.el.nativeElement.classList.remove('wish');
    this.isWish = false;
    this.wishServ.remove(elem)
  }

  seeBig(link) {
    this.bigPict = link
  }

  
}