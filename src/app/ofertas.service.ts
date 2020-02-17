import {Oferta} from '../shared/oferta.model'
import { HttpClient } from '@angular/common/http'
import {Injectable} from '@angular/core'
import { map } from 'rxjs/operators';
import { retry } from 'rxjs/operators';

import { URL_API } from './app.api'
import { Observable } from 'rxjs'

@Injectable()
export class OfertasService{


    constructor(private http: HttpClient){}

    public getOfertas(): Promise<Oferta[]>{
        //requisição http
        //retorna uma promise oferta[]
        return this.http.get(`${URL_API}/ofertas?urldestaque=true`).toPromise().then((resposta: any) => resposta) 
    }

    public getOfertasPorCategoria(categoria: string): Promise<Oferta[]>{
        return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`).toPromise().then((resposta: any) => resposta)
    }

    public getOfertasPorCategoria2(categoria: string): Promise<Oferta[]>{
        return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`).toPromise().then((resultado: any) => resultado)
    }

    public getOfertasId(id: number): Promise<Oferta>{
        return this.http.get(`${URL_API}/ofertas?id=${id}`).toPromise().then((resultado: any) => {
            return resultado.shift()
        })
    }

    public getComoUsarOfertaPorId(id: number): Promise<string>{
        return this.http.get(`${URL_API}/como-usar?=${id}`).toPromise()
        .then((resposta: any) => {
            return resposta.shift().descricao
        })
    }

    public getOndeFicaPorId(id: number): Promise<string>{
        return this.http.get(`${URL_API}/onde-fica?=${id}`)
        .toPromise().then((resposta: any)=>{
            return resposta.shift().descricao
        })

    }

    public getPesquisaItem(termo: string): Observable<Oferta[]>{
        return this.http.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`)
        .pipe(retry(10),map((resposta: any)=> resposta))
    }

 

  /*  public ofertas: Array<Oferta> = [
        
        {
            id: 1,
            categoria: "restaurante",
            titulo: "Super Burger",
            descricao_oferta: "Rodízio de Mini-hambúrger com opção de entrada.",
            anunciante: "Original Burger",
            valor: 29.90,
            destaque: true,
            imagens: [
                {url: "/assets/ofertas/1/img1.jpg"},
                {url: "/assets/ofertas/1/img2.jpg"},
                {url: "/assets/ofertas/1/img3.jpg"},
                {url: "/assets/ofertas/1/img4.jpg"}
            ]
        },
        {
            id: 2,
            categoria: "restaurante",
            titulo: "Cozinha Mexicana",
            descricao_oferta: "Almoço ou Jantar com Rodízio Mexicano delicioso.",
            anunciante: "Mexicana",
            valor: 32.90,
            destaque: true,
            imagens: [
                {url: "/assets/ofertas/2/img1.jpg"},
                {url: "/assets/ofertas/2/img2.jpg"},
                {url: "/assets/ofertas/2/img3.jpg"},
                {url: "/assets/ofertas/2/img4.jpg"}
            ]
        
        },
        {
            id: 4,
            categoria: "diversao",
            titulo: "Estância das águas",
            descricao_oferta: "Diversão garantida com piscinas, trilhas e muito mais.",
            anunciante: "Estância das águas",
            valor: 31.90,
            destaque: true,
            imagens: [
                {url: "/assets/ofertas/3/img1.jpg"},
                {url: "/assets/ofertas/3/img2.jpg"},
                {url: "/assets/ofertas/3/img3.jpg"},
                {url: "/assets/ofertas/3/img4.jpg"},
                {url: "/assets/ofertas/3/img5.jpg"},
                {url: "/assets/ofertas/3/img6.jpg"}
            ]
        }
    ]*/

   /* public getOfertas(): Array<Oferta>{
        return this.ofertas
    }*/

    /*
    public getOfertas2(): Promise<Array<Oferta>>{
        return new Promise((resolve, reject) => {
            //faz o processamento e no final chama a funcão resolve ou reject
            let retorno = true
            if(retorno){
                setTimeout(() => resolve(this.ofertas),3000)
            }else{
                reject({codigo_erro: 404, mensagem: "Servidor não encontrado"})
            }
            
        }).then((ofertas: Oferta[]) => {
            console.log("primeiro then executado")
            return ofertas
        }).then((ofertas: Oferta[])=>{
            console.log("Segundo then executado")
            return new Promise((resolve2, reject2) => {
                setTimeout(() => resolve2(ofertas),3000)
            })
        }).then((ofertas: Oferta[]) => {
            console.log("Terceira promise")
            return ofertas
        })
    }*/

}