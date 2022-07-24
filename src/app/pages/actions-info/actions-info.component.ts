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
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(response => {
      this.action = response['actionsInfo'];
    });
  }



  getOneAction(): void {
    const DISCOUNT_ID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.actionsService.getOne(DISCOUNT_ID).subscribe(data => {
      this.action = data;
    })
  }
}
