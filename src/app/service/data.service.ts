import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StatesCollection } from '../model/states-collection'
import { DistrictCollection } from '../model/district-collection'
import { Statesdata } from '../model/statesdata';
import { DistrictInfo } from '../model/district-info';
import { Vaccinedata } from '../model/vaccinedata';
import { Sessions } from '../model/sessions';
import { DatePipe } from '@angular/common';
import { statesjson } from '../utility/states';
import { districts } from '../utility/districts'
import { StateWithDistrictInfo } from '../model/state-with-district-info';
import { Observable } from 'rxjs';
import { SessionsWithDistrictId } from '../model/sessions-with-district-id';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  statesList:StatesCollection;
  statesInfo: Statesdata;
  allDistricts: StateWithDistrictInfo[]=[];
  vaccineInfo: Sessions[];
  allSessions: Array<SessionsWithDistrictId>=[];

  states_url: string="https://cdn-api.co-vin.in/api/v2/admin/location/states";
  district_url:string="https://cdn-api.co-vin.in/api/v2/admin/location/districts/";
  vaccineinfo_url: string= 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=';


  constructor(private http: HttpClient, public datepipe: DatePipe) { 
    console.log("constructor of data service called");
    new Promise((resolve, reject)=>{
      this.statesList=statesjson;
        resolve(this.statesList)
    }).then((data)=>{
      console.log("second promise of data service to get districts called");
      console.log(data);
      this.getDistricts();
    })
  }

  getDistricts() {
    console.log("get districts called");
    new Promise((resolve, reject)=>{
     this.allDistricts= districts;
      resolve(this.allDistricts);
    }).then(async (data)=>{
      console.log('district json: ');
      console.log(data);
      // this.allDistricts= districts;
      await this.getVaccineInfo();  
      console.log("session list");
      console.log(this.allSessions);      
    })    
  }


//USE THIS WHEN FETCHING STATES AND DISTRICTS DATA FROM API    
  // constructor(private http: HttpClient, public datepipe: DatePipe) { 
  //   console.log("constructor of data service called");
  //   new Promise((resolve, reject)=>{
  //     console.log("1st promise to get states of data service called");
  //     this.getStatesRestCall().subscribe(data=>{
  //       console.log("states data:");
  //       console.log(data);
  //       this.statesList= data;
  //       resolve(this.statesList)
  //     });
  //   }).then((data)=>{
  //     console.log("second promise of data service to get districts called");
  //     console.log(data);
  //     this.getDistricts();
  //   })
  // }

  // getStatesRestCall():Observable<StatesCollection>{
  //     return this.http.get<StatesCollection>(this.states_url);
      
  //   }

  //   getDistricts() {
  //     console.log("get districts called");
  //     new Promise((resolve, reject)=>{
  //       this.statesList.states.forEach((state) =>{
  //         let newurl= this.district_url+state.state_id;

  //         this.http.get<DistrictCollection>(newurl)
  //                     .subscribe(async (data) => {
  //                       data.districts.forEach(element => {
  //                         var district:StateWithDistrictInfo ={"state_id":0,"district_name":"", "district_id":0 };
  //                         district.state_id=state.state_id;
  //                         district.district_name=element.district_name;
  //                         district.district_id=element.district_id;
    
  //                         this.allDistricts.push(district);
  //                       });
  //                     })             
  //       })
  //       resolve(this.allDistricts);
  //     }).then(async (data)=>{
  //       console.log('district json: ');
  //       console.log(data);
  //       // this.allDistricts= districts;
  //       await this.getVaccineInfo();  
  //       console.log("session list");
  //       console.log(this.allSessions);      
  //     })    
  //   }

   getVaccineInfo() {
     console.log("printing districts data: ")
     console.log(this.allDistricts);
      new Promise((resolve, reject)=>{
          var date=new Date();
          let latest_date =this.datepipe.transform(date, 'dd-MM-yyyy');
        
          this.allDistricts.forEach(district=>{
            let new_url=this.vaccineinfo_url+district.district_id+'&date='+latest_date;
            
            this.http.get<Vaccinedata>(new_url).subscribe(data => {
              this.vaccineInfo=data.sessions;
              this.vaccineInfo.forEach(s=>{
                var sessionWithDistrict:SessionsWithDistrictId={"district_id":0, "center_id":0, "name":"", "address":"", "state_name":"", "district_name":"", "pincode":0, "from":"", "to":"", "fee_type":"", "date":"", "available_capacity_dose1":0, "available_capacity_dose2":0, "available_capacity":0, "fee":"", "min_age_limit":0, "vaccine":"", "slots":[]};
                sessionWithDistrict.district_id=district.district_id;
                sessionWithDistrict.center_id=s.center_id;
                sessionWithDistrict.name=s.name;
                sessionWithDistrict.address=s.address;
                sessionWithDistrict.state_name=s.state_name;
                sessionWithDistrict.district_name=s.district_name;
                sessionWithDistrict.pincode=s.pincode;
                sessionWithDistrict.from=s.from;
                sessionWithDistrict.to=s.to;
                sessionWithDistrict.fee_type=s.fee_type;
                sessionWithDistrict.date=s.date;
                sessionWithDistrict.available_capacity_dose1=s.available_capacity_dose1;
                sessionWithDistrict.available_capacity_dose2=s.available_capacity_dose2;
                sessionWithDistrict.available_capacity=s.available_capacity;
                sessionWithDistrict.fee=s.fee;
                sessionWithDistrict.min_age_limit=s.min_age_limit;
                sessionWithDistrict.vaccine=s.vaccine;
                sessionWithDistrict.slots=s.slots;
                this.allSessions.push(sessionWithDistrict);
              })
            })
          })
        resolve("done");
    }).then(()=>{
      console.log("fetched sessions");
      console.log(this.allSessions);
    })
  }

  //  getSessionsList(): Sessions[] {
  //   return this.allSessions;
  // }

  getAllStates(): Statesdata[] {
    console.log("get states called ")
    console.log(this.statesList);
    return this.statesList.states;
  }

  getDistrictForStateId(stateId: number): StateWithDistrictInfo[] {
    return this.allDistricts.filter((state)=> state.state_id== stateId);
  }

  getVaccineForDistrict(districtId: number, age:number): SessionsWithDistrictId[] {
    console.log("getting vaccine info with age: "+age);
    return this.allSessions.filter(vaccine=>(vaccine.district_id == districtId && vaccine.min_age_limit == age));
  }

}


