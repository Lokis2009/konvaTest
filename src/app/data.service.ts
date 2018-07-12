import {Injectable} from '@angular/core';
import {AppSettings} from './config/config';
import {CookieService} from 'ngx-cookie';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class DataService {
  appSettings: AppSettings = new AppSettings;
  private _countries: BehaviorSubject<any[]>;
  private _usersList: BehaviorSubject<any[]>;
  private _admin: BehaviorSubject<any>;
  private _user: BehaviorSubject<any>;
  private _approveList: BehaviorSubject<any>;
  private dataStore: {
    countries: any[],
      users: any[],
    admin: any,
    user: any,
    approveList: any[]
    };
  colorTable: any;

   constructor(private _cookies: CookieService,
               private http: HttpClient
               ) {
     this.colorTable = {};
     this.dataStore = {
       countries: [],
       users: [],
       admin: null,
       user: null,
       approveList: []
     };
     this._usersList = <BehaviorSubject<any[]>>new BehaviorSubject([]);
     this._approveList = <BehaviorSubject<any[]>>new BehaviorSubject([]);
     this._countries = <BehaviorSubject<any[]>>new BehaviorSubject([]);
     this._admin = <BehaviorSubject<any>>new BehaviorSubject({});
     this._user = <BehaviorSubject<any>>new BehaviorSubject({});
     try {
       this.refreshAllInfo ();
     } catch (err) {
       console.log(err);
     }
   }
  getCountriesList (): Observable<any[]> {
    return this._countries.asObservable();
  }
  getAdminInfoFromServise (): Observable<any> {
    return this._admin.asObservable();
  }
  getUsersList (): Observable<any[]> {
     return this._usersList.asObservable();
  }
  getApproveList (): Observable<any[]> {
    return this._approveList.asObservable();
  }
  // toggleUser(id, user) {
  //    this.httpService.patchData('admin/users', id + '/status', {blocked: !user.blocked}).subscribe( res => {
  //      this.httpService.getData('admin', 'users')
  //        .subscribe(responce => {
  //          this.dataStore.users = responce;
  //          this._usersList.next(Object.assign({}, this.dataStore).users);
  //        });
  //    });
  // }
  // updateUser(id, user): Observable<any> {
  //   this.http.patch <any> (this.appSettings.API_server + 'admin/users/' + id + '/status', user, {
  //     headers: new HttpHeaders().set('Authorization', this._cookies.get('at')).set('language', 'english')
  //   }).subscribe( res => {
  //     this.dataStore.user = res;
  //     this._user.next(Object.assign({}, this.dataStore).user);
  //     this.httpService.getData('admin', 'users')
  //       .subscribe(responce => {
  //         this.dataStore.users = responce;
  //         this._usersList.next(Object.assign({}, this.dataStore).users);
  //       });
  //   });
  //   return this._user.asObservable();
  // }
  // approve (item): void {
  //    const obj = {
  //      type: item.type,
  //      status: 'approved',
  //      id: item.id,
  //      issues: ''
  //    };
  //    if (item.suggestUpdate) {
  //      obj.id = item.suggestUpdate.suggestId;
  //      obj.type = 'suggest';
  //    }
  //    this.httpService.patchData('admin/instance', 'status', obj).subscribe(res => {
  //      this.updateApprove();
  //    });
  // }
  // regect (item, message): void {
  //   const obj = {
  //     type: item.type,
  //     status: 'rejected',
  //     id: item.id,
  //     issues: message
  //   };
  //   if (item.suggestUpdate) {
  //     obj.id = item.suggestUpdate.suggestId;
  //     obj.type = 'suggest';
  //   }
  //   this.httpService.patchData('admin/instance', 'status', obj).subscribe(res => {
  //     this.updateApprove();
  //   });
  // }
  // updateApprove (): void {
  //   this.httpService.getData('admin', 'approve')
  //     .subscribe(res => {
  //       this.dataStore.approveList = this.addApproveColor(res);
  //       // this.dataStore.approveList = res;
  //       this._approveList.next(Object.assign({}, this.dataStore).approveList);
  //     });
  //  }
  refreshAllInfo (): void {
    // this.http.get <any[]>(this.appSettings.API_server + 'countries', {
    //   headers: new HttpHeaders().set('Authorization', this._cookies.get('at')).set('language', 'english')
    // }).subscribe(res => {
    //   this.dataStore.countries = res;
    //     this._countries.next(Object.assign({}, this.dataStore).countries);
    // });
    // this.http.get <any>(this.appSettings.API_server + 'user/my', {
    //   headers: new HttpHeaders().set('Authorization', this._cookies.get('at')).set('language', 'english')
    // }).subscribe( res => {
    //   this.dataStore.admin = res;
    //   this._admin.next(Object.assign({}, this.dataStore).admin);
    // }, err => {
    //   this._cookies.put('at', null);
    // });
    // this.httpService.getData('admin', 'users')
    //   .subscribe(res => {
    //     this.dataStore.users = res;
    //     this._usersList.next(Object.assign({}, this.dataStore).users);
    //   });
    // this.httpService.getData('admin', 'approve')
    //   .subscribe(res => {
    //     this.dataStore.approveList = this.addApproveColor(res);
    //     this._approveList.next(Object.assign({}, this.dataStore).approveList);
    //   });
   }

   addApproveColor(approveList) {
     approveList.forEach(item => {
       // console.log(item)
     //  if (item.field_id > 255) {
     //    item.menuColor = 'rgba(' + item.field_id % 255 +', 0, 0, 0.4)';
     //  } else {
     //    item.menuColor = 'rgba(' + item.field_id  +', 0, 0, 0.4)';
     //  }
       if (this.colorTable[item.field_id] === undefined) {
         this.colorTable[item.field_id] = this.getRandomColor();
       }
       item.menuColor = this.colorTable[item.field_id];
     });
     return approveList;
   }
   getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
