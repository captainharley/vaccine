import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import * as mapboxgl from 'mapbox-gl';
import { Sessions } from '../model/sessions';
import { DataService } from './data.service';
import * as XLSX from 'xlsx'; 
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
@NgModule({
  providers:[],
})
export class VaccineServiceService {
 
  // map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/light-v10';
  lat = 19.097018048581127;
  lng = 74.75417418763983;

  vSessions: Sessions[];

  constructor(private http: HttpClient, private dataService: DataService) { 
   
    // this.vSessions= this.dataService.getSessionsList();
  }

  async addMarker(){
     await new Promise((resolve, reject)=>{
      // this.vSessions= DataService.getSessionsList();
    //   console.log("inside addMarker method");     
    //  }).then((data)=>{
      // Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set(environment.mapbox.accessToken);
    
      var map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 6,
        center: [this.lng, this.lat]
      });
      console.log(this.vSessions);
      
      var fileName= 'AddressSheet.xlsx'; 
      
      setTimeout( ()=>{
        console.log(this.vSessions.length);

        //   var geojson={
        //     type: 'Feature',
        //     geometry: {
        //       type: 'Point',
        //       coordinates: [75.3194549350594, 20.17725341965117]
        //     },
        //     properties: {
        //       title: 'Mapbox',
        //       iconSize:[60, 60],
        //       message: 'Shendi'
        //     }
        //   }

        //   var ws= XLSX.utils.aoa_to_sheet([["address", "Dummy"]]);
        //   XLSX.utils.sheet_add_aoa(ws, [[geojson.properties.message, 1]], {origin: -1});
        //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
        //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        //   XLSX.writeFile(wb, fileName);
         

        //   var el = document.createElement('i');
        //   el.className = 'marker fas fa-map-marker-alt';
        //   el.style.width = geojson.properties.iconSize[0] + 'px';
        //   el.style.height = geojson.properties.iconSize[1] + 'px';
        //   el.style.backgroundSize = '100%';
            
        //   el.addEventListener('click', function () {
        //   window.alert(geojson.properties.message);
        //   });
            
        //   // Add markers to the map.
        //   new mapboxgl.Marker(el)
        //   .setLngLat([geojson.geometry.coordinates[0], geojson.geometry.coordinates[1]])
        //   .addTo(map);
        // // });


        this.vSessions.forEach(async (s)=>{
          var geojson={
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [s.long, s.lat]
            },
            properties: {
              title: 'Mapbox',
              iconSize:[60, 60],
              message: s.name+','+s.address+','+s.district_name+','+s.state_name
            }
          }

          var el = document.createElement('i');
          el.className = 'marker fas fa-map-marker-alt';
          el.style.width = geojson.properties.iconSize[0] + 'px';
          el.style.height = geojson.properties.iconSize[1] + 'px';
          el.style.backgroundSize = '100%';
            
          el.addEventListener('click', function () {
          window.alert(geojson.properties.message);
          });
            
          // Add markers to the map.
          new mapboxgl.Marker(el)
          .setLngLat([geojson.geometry.coordinates[0], geojson.geometry.coordinates[1]])
          .addTo(map);

        });
      }, 5000);
     })     
    
  }

}
