import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WhyUsComponent } from './why-us/why-us.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ReportComponent } from './report/report.component';
import { HiringComponent } from './hiring/hiring.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'contact-us', component: ContactFormComponent},
    { path: 'report', component: ReportComponent },
    { path: 'why-us', component: WhyUsComponent },
    { path: 'hiring', component: HiringComponent }
];

