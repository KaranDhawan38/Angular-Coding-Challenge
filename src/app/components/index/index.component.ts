import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MockTableData } from 'src/app/mock-data/mock-table-data';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  displayedColumns: string[] = ['CustomerName', 'ProjectName', 'GlobalMaster', 'Indicator', 'TechnicalPerson', 'ForecastGenerated', 'Actions'];
  dataSource = MockTableData;

  constructor(private router: Router) {
    //Do nothing.
   }

  ngOnInit(): void {
    //Do nothing.
  }

  /**
   * This method will remove session of logged in user and redirect to login page.
   */
  logoutUser(){
    sessionStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }
}
