import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service'
import { switchMap, debounceTime, distinctUntilChanged,catchError } from 'rxjs/operators'
import { of, Observable, Subject } from 'rxjs'
import { Oferta } from '../../shared/oferta.model'


@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>
  private subjectPesquisa: Subject<string> = new Subject<string>();

  constructor(private ofertaService: OfertasService) { }

  public pesquisa(termoDaBusca: string): void{
    
    this.subjectPesquisa.next(termoDaBusca)
  }

  public pesquisaLimpar(): void {
    this.subjectPesquisa.next('')
  }

  ngOnInit() {
   this.ofertas =  this.subjectPesquisa.pipe(debounceTime(1000),distinctUntilChanged(),switchMap((termo: string)=> {

     if(termo.trim() === ''){
       //retorna um observable vazio de ofertas caso limpe o campo de pesquisa
       return of<Oferta[]>([])
     }
       return this.ofertaService.getPesquisaItem(termo)
    })),catchError((err: any)=>{
      console.log(err)
      return of<Oferta[]>([])
    })  
  }

}
