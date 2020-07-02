import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {DashboardService, IChartData} from '../../core/services/dashboard.service';
import {FormControl, FormGroup} from '@angular/forms';

interface ISelectValues {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

    categoriesForSelect: ISelectValues[] = [
        {value: 'country', viewValue: 'Страна'},
        {value: 'city', viewValue: 'Город'}
    ];

    valuesForSelect: ISelectValues[] = [
        {value: 'transactions', viewValue: 'Транзакции'},
        {value: 'amount', viewValue: 'Сумма'}
    ];

    public data: IChartData[] = [];
    sub: any;
    view: any[] = [];

    // options
    showXAxis = true;
    showYAxis = true;
  showDataLabel = true;

    colorScheme = {
        domain: ['#f37167']
    };
    selectFormGroup: FormGroup;

    selectedName = 'country';
    selectedValue = 'transactions';

    constructor(private authService: AuthService, public dashboardService: DashboardService) {
      this.view = [innerWidth / 1.3, 400];
    }

    ngOnInit(): void {
        this.selectFormGroup = new FormGroup({
            nameSelect: new FormControl('country'),
            valueSelect: new FormControl('transactions')
        });

        this.sub = this.dashboardService.getTransactions().subscribe(tr => {
            this.data = this.dashboardService.formatData(this.selectedName, this.selectedValue);
            console.log(this.data);
            this.data = [...this.data];
        });

        this.selectFormGroup.get('nameSelect').valueChanges.subscribe(value => {
                console.log(value);
                this.selectedName = value;
                this.data = this.dashboardService.formatData(this.selectedName, this.selectedValue);
                this.data = [...this.data];
            }
        );

        this.selectFormGroup.get('valueSelect').valueChanges.subscribe(value => {
              console.log(value);
              this.selectedValue = value;
              this.data =  this.dashboardService.formatData(this.selectedName, this.selectedValue);
              this.data = [...this.data];
            }
        );
    }

    logout() {
        this.authService.logout();
    }

  onResize(event) {
    this.view = [event.target.innerWidth / 1.35, 400];
  }
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
