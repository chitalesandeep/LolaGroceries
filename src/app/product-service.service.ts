import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db:AngularFireDatabase) { }

  createVal(tbl,vals) {
      return this.db.list(tbl).push(vals);
  }

  getAll(tbl) {
    return this.db.list(tbl);
  }

  getInfo(tbl,ID) {
    return this.db.object(tbl+ID);
  }

  updateVal(ID,tbl,obj) {
      return this.db.object(tbl + ID).update(obj);
  }

  deleteVal(ID,tbl) {
    return this.db.object(tbl + ID).remove();
  }
}
