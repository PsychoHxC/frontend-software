import { Component } from '@angular/core';
import { GerenciaService } from 'src/app/servicios/gerencia.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent {

  categoria:any;

  constructor(private scate:GerenciaService){}

  ngOnInit(): void{
    this.consulta()
  }

  consulta(){
    this.scate.consultar().subscribe((res:any)=>{

      this.categoria =res;
    })
  }

  eliminar(id:number){

    Swal.fire({
      title: "Esta seguro?",
      text: "No podras revertir la decisión!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {

        this.scate.eliminar(id).subscribe((resp:any) =>{
          if (resp['resultados']== 'OK'){
            this.consulta();
          }
        })

        Swal.fire({
          title: "Eliminado!",
          text: "A sido eliminado con exito.",
          icon: "success"
        });
      }
    });
  }

}
