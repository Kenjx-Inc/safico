import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { DataService } from './data.service';
import { catchError, take, takeUntil, shareReplay } from 'rxjs/operators';
import { EMPTY, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataResolverService implements Resolve<any>, OnDestroy {
  itemDetails: any;
  private unsubscribe$ = new Subject<void>();

  constructor(private dataService: DataService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');
    return this.dataService.getItem(id)
      .pipe(take(1),
        shareReplay(),
        catchError(() => {
          this.router.navigate(['/']);
          return EMPTY;
        }),
        takeUntil(this.unsubscribe$)
      );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
