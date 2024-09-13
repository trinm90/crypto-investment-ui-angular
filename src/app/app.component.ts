import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HeaderComponent } from './components/header/header.component';
import { FlexLayoutModule } from "@angular/flex-layout";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    SidenavComponent,
    HeaderComponent,
    FlexLayoutModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Crypto Investment';

  sidebarOpen = false;

  constructor() { }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
