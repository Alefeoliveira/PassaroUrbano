import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { Oferta } from '../../shared/oferta.model'
import { OfertasService } from '../ofertas.service'
import { interval, Observer, Subscription } from 'rxjs';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService]
})
export class OfertaComponent implements OnInit, OnDestroy {

  public oferta: Oferta

  constructor(private router: ActivatedRoute, private ofertasService: OfertasService) { }

  ngOnInit() {

    this.router.params.subscribe((parametros: Params)=>{
      
      this.ofertasService.getOfertasId(parametros.id)
      .then((oferta: Oferta) => {
        this.oferta = oferta
      })
      
    })

  }

  ngOnDestroy(){
   
  }

 

}
