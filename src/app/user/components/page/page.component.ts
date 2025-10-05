import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MainComponent } from '../main/main.component';
import { PagesService } from '../../../shared/services/pages.service';
import { PageType } from '../../../shared/types/page.type';
import { AdminRoutesModule } from "../../../admin/routes/routes.module";
// import { MetaDataService } from '../../../shared/services/meta-data.service';

@Component({
  selector: 'app-page',
  imports: [AdminRoutesModule],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent {
  permalink!: string | null;
  page!: PageType | undefined;
  constructor (
    private mc: MainComponent,
    private activatedRoute: ActivatedRoute,
    private domTitle: Title,
    private allPages: PagesService,
    private router: Router
  ) {
    allPages.pages.subscribe((data) => {
    this.activatedRoute.paramMap.subscribe(params => {
        this.permalink = params.get('permalink');
        this.page = (data as PageType[]).find(d => d.permalink == this.permalink)
        if (!this.page) {
          this.router.navigate(['home']);
        }
      });
        this.domTitle.setTitle(`${this.mc.metaData.title} - ${this.page?.title}`);
      });
  }

}
