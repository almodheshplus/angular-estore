import { Component, inject } from '@angular/core';
import { MainComponent } from '../main/main.component';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../../shared/services/products.service';
import { ProductType } from '../../../shared/types/product.type';
import { AdminRoutesModule } from "../../../admin/routes/routes.module";
import { CartService } from '../../services/cart.service';
import { MetaDataService } from '../../../shared/services/meta-data.service';
// import { MetaDataService } from '../../../shared/services/meta-data.service';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [AdminRoutesModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  metaData: any
  products!: ProductType[]

  constructor (
    private domTitle: Title,
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private metaDataService: MetaDataService,
    public cart: CartService
  ) {
    this.activatedRoute.paramMap.subscribe(_ => {
      this.domTitle.setTitle('Home')
    });

    this.metaDataService.fetchData().subscribe(data => {
      this.metaData = data
    })
    this.productsService.products().subscribe(data => {
      this.products = data as ProductType[]
    });
  }

}
