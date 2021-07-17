import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';
import { DistrictInfo } from '../model/district-info';
import { Sessions } from '../model/sessions';
import { SessionsWithDistrictId } from '../model/sessions-with-district-id';
import { StateWithDistrictInfo } from '../model/state-with-district-info';
import { Statesdata } from '../model/statesdata';
import { DataService } from '../service/data.service';

    
@Component({
  selector: 'app-ui-view',
  templateUrl: './ui-view.component.html',
  styleUrls: ['./ui-view.component.css']
})
export class UiViewComponent implements OnInit {

  allSessions: Array<Sessions>=[];
  allStates: Array<Statesdata>=[];
  stateDistricts: Array<StateWithDistrictInfo>=[];
  isHidden:boolean=true;
  vaccineSlots: Array<SessionsWithDistrictId>=[];

  age:number=18;
  districtSelected:number=0;

  constructor(public dataservice:DataService) { 
    console.log("constructor of ui view component called")
    this.allStates= this.dataservice.getAllStates();
  }

  ngOnInit(): void {
    console.log("init of ui view component called")
    this.allStates= this.dataservice.getAllStates();
  }

  showstateDistricts(stateId:number){
    var allState= Array.from(document.getElementsByClassName('state') as HTMLCollectionOf<HTMLElement>);  
    allState.forEach(ele=>{
      ele.style.color='black';
      ele.style.backgroundColor='white';
    })
     
    var stateName= document.getElementById("state_"+stateId);
    this.stateDistricts= this.dataservice.getDistrictForStateId(stateId);
    this.isHidden=false;
    this.vaccineSlots=[];
    stateName.style.color='#0080ff';
    stateName.style.backgroundColor='#f5f5f5';

    
    var x = window.matchMedia("(max-width: 700px)")
    this.myFunction(x) // Call listener function at run time
  }

  myFunction(x) {
    var alldistrict= Array.from(document.getElementsByClassName('district-dashboard') as HTMLCollectionOf<HTMLElement>);  
    var allState= Array.from(document.getElementsByClassName('states-dashboard') as HTMLCollectionOf<HTMLElement>);  

    if (x.matches) { // If media query matches
      allState.forEach(ele=>{
        ele.style.display='none'; 
      })

      alldistrict.forEach(distele=>{
        distele.style.display='block'; 
      })
    }
  }
  


  showVaccineDataForDistrict(districtId:number){
    var x = window.matchMedia("(max-width: 700px)")
    this.myFunction(x) // Call listener function at run time
    
    this.districtSelected=districtId;
    var allDistricts= Array.from(document.getElementsByClassName('district') as HTMLCollectionOf<HTMLElement>);  
    allDistricts.forEach(ele=>{
      ele.style.color='black';
      ele.style.backgroundColor='white';
    })
    console.log("district id : "+districtId);
    this.vaccineSlots= this.dataservice.getVaccineForDistrict(districtId, this.age); 
    console.log("vaccines fetched : "+this.vaccineSlots);
    var districtName= document.getElementById("district_"+districtId);
    districtName.style.color='#0080ff';
    districtName.style.backgroundColor='#f5f5f5';
  }


  updateage(newAge:number){
    this.age=newAge;
    console.log("updated age value to :"+newAge);
    this.showVaccineDataForDistrict(this.districtSelected);
    var age_toggle= Array.from(document.getElementsByClassName('age-toggle') as HTMLCollectionOf<HTMLElement>);
      age_toggle.forEach(element => {
        element.classList.toggle('age-active');    
      }); 
  }

  showStates(){
    var alldistrict= Array.from(document.getElementsByClassName('district-dashboard') as HTMLCollectionOf<HTMLElement>);  
    var allState= Array.from(document.getElementsByClassName('states-dashboard') as HTMLCollectionOf<HTMLElement>);  

    console.log("back btn clicked")
    allState.forEach(ele=>{
      ele.style.display='block'; 
    })
    alldistrict.forEach(ele=>{
      ele.style.display='none'; 
    })
  }
}
