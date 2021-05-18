import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appareil } from '../models/appareil';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  tabAppareil : Appareil[];
  constructor(private appareilService : AppareilService , private router : Router) { }

  ngOnInit(): void {
    //// --------------- partie service 
    // ceci ne sera pas possible puisque on va travailler avec subject 
    //this.tabAppareil = this.appareilService.appareils;
    // console.log(this.tabAppareil);

    // je viens  m'abonner au subject
    // je recois le tab de couleur Quand il arrivera
    this.appareilService.appareilSubject.subscribe(
      (appareils :Appareil[]) => 
      {
        // ici c'est le tableau que j'ai envoyer dans emit avec la fonction next()
        this.tabAppareil = appareils;
      }
    );
    this.appareilService.loadFire();
  }


  onSeeMoreInfo(index){
    this.router.navigate(['appareil/view/'+index]);
    // appeler le service qui faire une promess 
    // this.appareilService.seeMoreInfo(index).then(
    //   (info) => {
        
    //   }
    // )

  }

  
  onSwitchAllOn(){
    this.appareilService.switchAllOn();
  }
  onSwitchAllOff(){
    this.appareilService.switchAllOff();

  }
  onSwitchOneOn(index){
    this.appareilService.switchOneOn(index);
  }
  onSwitchOneOff(index){
    this.appareilService.switchOneOff(index);

  }
}
