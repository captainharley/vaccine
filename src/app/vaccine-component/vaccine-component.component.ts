import { Component, OnInit } from '@angular/core';
import { Sessions } from '../model/sessions';
import { DataService } from '../service/data.service';
import { VaccineServiceService } from '../service/vaccine-service.service';
import { environment } from '../../environments/environment'
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-vaccine-component',
  templateUrl: './vaccine-component.component.html',
  styleUrls: ['./vaccine-component.component.css']
})
export class VaccineComponentComponent implements OnInit {

  vSessions: Array<Sessions>=[];

  constructor(private dataservice: DataService, private vaccineService: VaccineServiceService) {   }

  ngOnInit(): void {   
    this.vaccineService.addMarker(); 
  }  
}
