import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { promise } from "selenium-webdriver";
import { Appareil } from "../models/appareil";

@Injectable()
export class AppareilService{

    // code avce fire base 
    url :string = 'https://premier-test-d5938-default-rtdb.firebaseio.com/appareils.json';
    public appareilSubject = new Subject();
    appareils:Appareil[] =[];
    // httpClient
    constructor(private httpClient: HttpClient) {}

    // 
    emitAppareilSubject(){
        this.appareilSubject.next(this.appareils);
    }


    // see more information about the element 
    seeMoreInfo(i : number){

        return new Promise(
            (resolve) => {
                console.log('more information cliqued ');
                
                this.emitAppareilSubject();
            }
        )
    }

    ajouter(appareilAdded: Appareil) {
        // ajouter dans le tableau local 
        this.appareils.push(appareilAdded);
        // enregister dans la base de donnee
        this.saveFire();
        // faire le emit
        this.emitAppareilSubject(); 
    
    }

    saveFire() {
        this.httpClient.put(this.url, this.appareils).subscribe(
            (response) => {
                console.log('donnee a jour dans la bdd');
            }
        );
    }

    loadFire() {
        this.httpClient.get<Appareil[]>(this.url).subscribe(

            (response) => {
                if (response != undefined)
                     this.appareils = response;
                console.log('loaded');
                this.emitAppareilSubject();
            }
        )
    }

    

    misAJour(){
       // enregister dans la base de donnee
        this.saveFire();
        // faire le emit
        this.emitAppareilSubject();  
    }

    // creer les methodes fonctionnels 
    // tout allumer
    switchAllOn() {
        this.appareils.forEach(item => {
            item.status = true;
        });
        this.misAJour();
    }
    // tout éteindre
    switchAllOff() {
        this.appareils.forEach(item => {
            item.status = false;
        });
        this.misAJour();
        
    }
    // allumer un appareil
    switchOneOn(i) {
        this.appareils[i].status = true;
        console.log('i === ' + i)
        this.misAJour();
    }
    // etaindre un appareil
    switchOneOff(i) {
        this.appareils[i].status = false;
        
        this.misAJour();
    }
/*
    // ancien code pour modification local 
    // je mets des appareils dans mon tableau 
    appareils:Appareil[] =[
        new Appareil('TV', true),
        new Appareil('Xbox', false),
        new Appareil('PlayStaion', true)
    ];
    
    
    
    
    ajouter(name: Appareil) {
      this.appareils.push(name);
    }
 */   
    
}