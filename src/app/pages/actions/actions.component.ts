import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { IActionsResponse } from 'src/app/shared/interfaces/actions/actions.interface';
import { ActionsService } from 'src/app/shared/services/actions/actions.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  public userActions: Array<IActionsResponse> = [];
  private eventSubscription!: Subscription;

  constructor(
    private actionsService: ActionsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.loadActions();
      }
    })
   }

  ngOnInit(): void {}

  loadActions(): void {
    const categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
    this.actionsService.getAllByCategory(categoryName).subscribe(data => {
      this.userActions = data;
    })
  }

  ngOnDestroy(): void {
      this.eventSubscription.unsubscribe();
  }
}
