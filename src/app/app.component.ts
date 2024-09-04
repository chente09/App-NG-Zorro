import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzFlexModule } from 'ng-zorro-antd/flex';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    NzBreadCrumbModule, 
    RouterLink, 
    RouterOutlet, 
    NzIconModule, 
    NzLayoutModule,
    NzAvatarModule,
    NzFlexModule,
    NzMenuModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = false;
  title = 'app-ngzorro';
}
