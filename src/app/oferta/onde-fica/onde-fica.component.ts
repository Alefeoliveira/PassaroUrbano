import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { OfertasService } from '../../ofertas.service'

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css']
})
export class OndeFicaComponent implements OnInit {

  public ondeFica: string

  constructor(private activatedRoute: ActivatedRoute, 
    private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertasService.getOndeFicaPorId(this.activatedRoute.parent.snapshot.params['id'])
    .then((descricao: string)=>{
      this.ondeFica = descricao
    })
  }

}
