import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';


export interface ITransactions {
    id: number;
    date: Date;
    country: string;
    city: string;
    transactions: number;
    amount: number;
}

export interface IChartData {
    name: string;
    value: any;
}

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    transactionsData: ITransactions[] = [];

    constructor(private http: HttpClient) {
    }

    getTransactions() {
        return this.http.get<ITransactions[]>(environment.apiUri + 'dashboard')
            .pipe(
                tap(tr => {
                    this.transactionsData = tr;
                })
            );
    }

    formatData(name: string, value: string): IChartData[] {
        let resArray = [];
        let uniqueArr = [...new Set(this.transactionsData.map(data => data[name]))];
        uniqueArr.forEach(country => {
            let sum = 0;
            this.transactionsData.forEach(el => {
                if (country === el[name]) {
                    sum += el[value];
                }
            });
            resArray.push({name: country, value: sum});
        });
        return resArray;
    }
}
