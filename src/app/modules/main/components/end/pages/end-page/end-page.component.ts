import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-end-page',
  templateUrl: './end-page.component.html',
  styleUrls: ['./end-page.component.scss'],
})
export class EndPageComponent implements OnInit {
  constructor(private router: Router) {}

  //Navigates user back to the auth page after a set amount of time
  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/auth']);
    }, 10000);
  }
}
