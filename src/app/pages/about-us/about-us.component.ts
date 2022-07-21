import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  public panelHidden1 = true;
  public panelHidden2 = true;
  public panelHidden3 = true;

  accordion1(): void {
    this.panelHidden1  = false;
  }

  accordion2(): void {
    this.panelHidden2  = false;
  }

  accordion3(): void {
    this.panelHidden3  = false;
  }





  constructor() { }

  ngOnInit(): void {
  }

}
