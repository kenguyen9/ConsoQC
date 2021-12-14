import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatTabsModule} from '@angular/material/tabs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LineChartComponent } from './graph/line-chart/line-chart.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { LoginComponent } from './login/login.component';
import { MetricsCompareComponent } from './graph/metrics-compare/metrics-compare.component';
import { MatNativeDateModule } from '@angular/material/core';
import { DayByDayComponent } from './graph/day-by-day/day-by-day.component';
import { InformationComponent } from './information/information.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LineChartComponent,
    LoginComponent,
    MetricsCompareComponent,
    DayByDayComponent,
    InformationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatListModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatDialogModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatProgressBarModule,
    MatDividerModule,
    MatMenuModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatTabsModule,

    HttpClientModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
