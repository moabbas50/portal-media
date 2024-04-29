import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'PortalMedia-FrontEnd';
  
  isScrolledDown: boolean = false;
  constructor(private elementRef: ElementRef) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  scrollToggle() {
    if (this.isScrolledDown) {
      this.scrollUp();
    } else {
      this.scrollDown();
    }
    this.isScrolledDown = !this.isScrolledDown;
  }

  scrollDown() {
    this.elementRef.nativeElement.querySelector('.scroll-down-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  scrollUp() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
