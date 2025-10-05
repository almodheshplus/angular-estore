import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PagesService } from '../../../shared/services/pages.service';
import { PageType } from '../../../shared/types/page.type';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pages',
  imports: [RouterLink],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css'
})
export class PagesComponent {
  public pages!: PageType[];
  constructor(
    private domTitle: Title,
    private allPages: PagesService
  ) {
    this.domTitle.setTitle('Admin - Pages');
    this.allPages.pages.subscribe(data => {
      this.pages = data as PageType[]
    })
  }
}
