import { Injectable } from '@angular/core';
import { Database, ref, set, get, child } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VisitCountService {
  private _pageCount = new BehaviorSubject<number>(0);
  count$ = this._pageCount.asObservable();

  constructor(private db: Database) {
    this.getPageCount();
  }

  private async getPageCount() {
    const dbRef = ref(this.db);
    try {
      const snapshot = await get(child(dbRef, 'pageCount'));
      if (snapshot.exists()) {
        this._pageCount.next(snapshot.val());
      }
    } catch (error) {
      console.error('Error getting page count:', error);
    }
  }

  incrementPageCount() {
    const dbRef = ref(this.db, 'pageCount');
    set(dbRef, this._pageCount.value + 1)
      .then(() => {
        this._pageCount.next(this._pageCount.value + 1);
      })
      .catch((error) => {
        console.error('Error updating page count:', error);
      });
  }
}
