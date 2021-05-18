import { Route } from '@angular/compiler/src/core';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Appareil } from '../models/appareil';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.scss']
})
export class AppareilComponent implements OnInit {
  appareils :Appareil[];
  appareil : Appareil;
  index : number;


  constructor(private appareilService : AppareilService , private route :ActivatedRoute) { }

  ngOnInit(): void {
    
    // je viens  m'abonner au subject
    // je recois le tab de couleur Quand il arrivera
    this.appareilService.appareilSubject.subscribe(
      (appareils :Appareil[]) => 
      {
        // ici c'est le tableau que j'ai envoyer dans emit avec la fonction next()
        this.appareils = appareils;
        this.index = Number(this.route.snapshot.params['id']) ;
        this.appareil = this.appareils[this.index];
        console.log('this.appareil ===' , Number(this.index), this.index);
      }
    );
    this.appareilService.loadFire();
    // recuperer les informations par id 
    
    
  }
  
  // this.appareil = this.getInformation(this.index);

  // getInformation(i : number){

  // }
  
  // onSwitchOneOn(index){
  //   this.appareilService.switchOneOn(index);
  // }
  // onSwitchOneOff(index){
  //   this.appareilService.switchOneOff(index);

  // }

  

}
