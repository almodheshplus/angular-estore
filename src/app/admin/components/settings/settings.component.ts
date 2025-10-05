import { Component } from '@angular/core';
import { AdminRoutesModule } from "../../routes/routes.module";

@Component({
  selector: 'app-settings',
  imports: [AdminRoutesModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

}
