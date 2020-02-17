import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { OfertasService } from '../../ofertas.service'
@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers: [OfertasService]
})
export class ComoUsarComponent implements OnInit {

  public comoUsar: string 
  constructor(private activatedRoute: ActivatedRoute, private ofertaServices: OfertasService) { }

  ngOnInit() {
    this.ofertaServices.getComoUsarOfertaPorId(this.activatedRoute.parent.snapshot.params['id'])
    .then((descricao: string)=>{
      this.comoUsar = descricao
    })
  }

}
