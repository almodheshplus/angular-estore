import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'AngularEStore';
  private http = inject(HttpClient)
  private router = inject(Router)
  ngOnInit(): void {
    this.http.get('http://localhost:3000/siteInfo').pipe(
      catchError((e, _): any => {
        this.router.navigate(['/not-local'])
      })
    ).subscribe(_ => {})
  }
}
