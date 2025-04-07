import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule], // Import RouterModule for standalone use
  template: `<router-outlet></router-outlet>`, // Load routes here
})
export class AppComponent { }
