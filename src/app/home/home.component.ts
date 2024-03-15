import { Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [MatTabsModule],
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
