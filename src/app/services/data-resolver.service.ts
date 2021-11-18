import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { DataService } from './data.service';
import { catchError, takeUntil } from 'rxjs/operators'
import { EMPTY, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataResolverService implements Resolve<any>, OnDestroy {
  itemDetails: any;
  private unsubscribe$ = new Subject<void>();

  constructor(private dataService: DataService, private router: Router) {
    this.itemDetails = null;
  }

  resolve(route: ActivatedRouteSnapshot) {
    let id = route.paramMap.get('id');
    this.dataService.getItem(id).pipe(catchError(() => {
      this.router.navigate(['/']);
      return EMPTY;
    }),
      takeUntil(this.unsubscribe$)
    ).subscribe((value) => {
      this.itemDetails = { ...value };
    });
    return this.itemDetails;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}