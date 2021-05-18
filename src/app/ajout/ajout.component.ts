import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Appareil } from '../models/appareil';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-ajout',
  templateUrl: './ajout.component.html',
  styleUrls: ['./ajout.component.scss']
})
export class AjoutComponent implements OnInit {

  constructor(private  appareilService : AppareilService) { }

  ngOnInit(): void {
  }
  appareilAdded : Appareil;
  onAjouterAppareil(form:NgForm){
    // je recupere la valeur saisie dans le formulaire
    let name = form.value["name"];
    let status = form.value["status"];
    // je cree l'objet Appareil 
    
    this.appareilAdded = new Appareil( name, status ==='isOn' ? true : false);
    // vider formulaire
    form.reset();

    this.appareilService.ajouter(this.appareilAdded); // ici je peu ajouter then si j'ai fait la promise

    // ajouter l'element au tableau 
    // this.appareilService.ajouter(appareil);
    
  }

}
