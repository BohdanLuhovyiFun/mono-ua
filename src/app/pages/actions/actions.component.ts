import { Component, OnInit } from '@angular/core';
import { IActionsResponse } from 'src/app/shared/interfaces/actions/actions.interface';
import { ActionsService } from 'src/app/shared/services/actions/actions.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  public userActions: Array<IActionsResponse> = [];

  constructor(
    private actionsService: ActionsService
  ) { }

  ngOnInit(): void {
    this.getActions()
  }

  getActions(): void {
    this.actionsService.getAll().subscribe(data => {
      this.userActions = data;
    });
  }
}
