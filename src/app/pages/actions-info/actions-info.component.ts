import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IActionsResponse } from 'src/app/shared/interfaces/actions/actions.interface';
import { ActionsService } from 'src/app/shared/services/actions/actions.service';

@Component({
  selector: 'app-actions-info',
  templateUrl: './actions-info.component.html',
  styleUrls: ['./actions-info.component.scss']
})
export class ActionsInfoComponent implements OnInit {

  public action!: IActionsResponse;

  constructor(
    private actionsService: ActionsService,
    private activateRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.getOneAction();
  }

  getOneAction(): void {
    const DISCOUNT_ID = Number(this.activateRoute.snapshot.paramMap.get('id'));
    this.actionsService.getOne(DISCOUNT_ID).subscribe(data => {
      this.action = data;
    })
  }
}
