import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LazyImageComponent } from './components/lazy-image/lazy-image.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ToastComponent } from './toast/toast.component';



@NgModule({
  declarations: [
    SidebarComponent,
    LazyImageComponent,
    FooterComponent,
    NavBarComponent,
    ToastComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    SidebarComponent,
    LazyImageComponent,
    FooterComponent,
    NavBarComponent
  ]
})
export class SharedModule { }
