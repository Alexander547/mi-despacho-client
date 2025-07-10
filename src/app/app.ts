import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppMenuComponent } from './layout/component/app.menu/app.menu.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppMenuComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('mi-despacho-client');

  ngOnInit() {}
}
