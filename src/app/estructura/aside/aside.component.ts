import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent {

  nombre:any;
  rol: any;

  constructor(private router: Router){}

  ngOnInit(): void{
    this.nombre = sessionStorage.getItem('nombre');
    this.rol = sessionStorage.getItem('rol');
    console.log(this.rol)
  }

}
