import { Component, OnInit } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Menus } from 'src/app/app.component';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent implements OnInit {
  menus: Menus[] = [
    {
      id: 'departments',
      title: 'Departments',
      icon: 'bi bi-diagram-3-fill',
      routerLink: '',
      collapse: false,
      children: [
        {
          id: 'dep-manager',
          title: 'Manager',
          icon: '',
          routerLink: 'departments',
          collapse: false,
          children: []
        },
        {
          id: 'product-attributes',
          title: 'Attributes',
          icon: '',
          routerLink: 'product-attributes',
          collapse: false,
          children: []
        },
        
      ],
      
    },
    {
      id: 'products',
      title: 'Products',
      icon: 'bi bi-box2-fill',
      routerLink: '',
      collapse: false,
      children: [
        {
          id: 'product-properties',
          title: 'Properties',
          icon: '',
          routerLink: 'product-properties',
          collapse: false,
          children: []
        }
      ]
    }
  ];
  constructor(
    private auth: AuthService,

    private offcanvasService: NgbOffcanvas
  ) {}

  ngOnInit(): void {}
  open(content: any) {
    this.offcanvasService.open(content, {
      ariaLabelledBy: 'offcanvas-basic-title',
    });
  }
}
