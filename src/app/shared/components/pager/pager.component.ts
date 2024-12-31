import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { pagerConfig } from '../../util/pager.config';

@Component({
  selector: 'app-pager',
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './pager.component.html',
  styleUrl: './pager.component.scss',
})
export class PagerComponent {
  config = pagerConfig;
}
