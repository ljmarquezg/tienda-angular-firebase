import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private cartService: CartService) { }

  user: any;
  showLink: boolean;

  ngOnInit() {
    this.checkURL();
  }

  checkURL(){
    this.showLink = this.router.url !== '/shop';
  }

  logout() {
    this.authService.logout();
  }
}
