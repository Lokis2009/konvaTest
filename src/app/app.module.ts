import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CookieModule} from 'ngx-cookie';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BarRatingModule} from 'ngx-bar-rating';
import {JwtModule} from '@auth0/angular-jwt';
import {FileUploadModule} from 'ng2-file-upload';
import {AngularFontAwesomeModule } from 'angular-font-awesome';
import {KonvaModule} from 'ng2-konva';
import {UiSwitchModule} from 'ngx-ui-switch';
import {SingleBoulderComponent} from './components/single-boulder/single-boulder.component';
import {MatTableModule} from '@angular/material';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ToolsService} from './tools.service';
import {DataService} from './data.service';



@NgModule({
  declarations: [SingleBoulderComponent,
  AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    FileUploadModule,
    AngularFontAwesomeModule,
    KonvaModule,
    BarRatingModule,
    UiSwitchModule,
    JwtModule,
    CookieModule.forRoot()
  ],
  providers: [ToolsService,
    DataService],
  bootstrap: [AppComponent],
  exports : []
})
export class AppModule { }
