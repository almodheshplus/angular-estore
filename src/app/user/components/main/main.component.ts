import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MetaDataService } from '../../../shared/services/meta-data.service';
import { CartService } from '../../services/cart.service';

@Component({
  standalone: true,
  selector: 'app-main',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css', './main.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {
  metaData: any

  constructor (
    private m: MetaDataService,
    public cart: CartService
  ) {
    this.loadData();
  }

  loadData() {
    this.m.fetchData().subscribe(data => {
      this.metaData = data
    });
  }

  ngOnInit(): void {
    this.loadScript('assets/vendor/php-email-form/validate.js')
    this.loadScript('assets/js/main.js')
  }

  // load javascript file
  private loadScript(scriptUrl: string): void {
    const script = document.createElement('script');
    script.src = scriptUrl;
    document.body.appendChild(script);
  }
}
