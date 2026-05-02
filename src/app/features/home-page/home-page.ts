import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'home-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-page.html',
})
export default class HomePage {}
