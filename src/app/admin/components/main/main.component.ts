import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css', './fontawesome-free/css/all.min.css', './sb-admin-2.min.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {
  constructor(private domTitle: Title, private router: Router) {
    this.domTitle.setTitle('Admin');
  }

  ngOnInit(): void {
    this.loadScript('assets/js/sb-admin-2.js');
  }

  // load javascript file
  private loadScript(scriptUrl: string): void {
    const script = document.createElement('script');
    script.src = scriptUrl;
    document.body.appendChild(script);
  }

  public logout() {
    window.localStorage.removeItem('token');
    window.location.reload();
  }
}
