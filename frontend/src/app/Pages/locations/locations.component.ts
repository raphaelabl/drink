import {Component, inject, OnInit} from '@angular/core';
import { LocationModel } from '../../model/location-model';
import {AuthService} from "../../shared/services/auth.service";
import {LocationService} from "../../shared/services/location.service";
import {CommonModule, NgForOf} from "@angular/common";
import {DrinkModel} from "../../model/drink-model";
import {FormsModule} from "@angular/forms";
import {GeoService} from "../../shared/services/geo.service";
import {query} from "@angular/animations";
import {VisitRequest} from "../../model/visit-request";
import {VisitRequestService} from "../../shared/services/visit-request.service";

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './locations.component.html',
  styleUrls: ["./location.component.scss"],
  styles: ``
})
export class LocationsComponent implements OnInit{

  authService: AuthService = inject(AuthService);
  geoService: GeoService = inject(GeoService);
  locationService: LocationService = inject(LocationService)
  visitRequestService: VisitRequestService = inject(VisitRequestService)

  locations: LocationModel[] = [];
  requests: VisitRequest[] = [];

  userId: string = "";
  currentLoc: any;

  ngOnInit(): void {
    this.authService.getUserId()
      .then((res: any) => {
        this.userId = res.id;
        this.loadLocations();
      })

    this.currentLoc = this.geoService.getCurrentLocation().then(
      (res: {lat: number, long: number}) => {
        this.currentLoc = res;
      }
    );
  }

  loadLocations(){
    this.locationService.getLocation(`host.id = "${this.userId}"`)
      .then((res: LocationModel[]) => {
        this.locations = res;

        this.locations.forEach(element => {
          this.visitRequestService.getVisitRequest(`location.id = "${element.id}" && accepted = ${false}`)
            .then((res: VisitRequest[]) => {
              this.requests = [...this.requests, ...res]
            })
        });
      })
  }


  async addLocation() {
    this.locations.push({
      id: '',
      name: '',
      longitude: this.currentLoc.long,
      latitude: this.currentLoc.lat,
      host: this.userId,
      hostName: "name",
      visitors: [],
      consumptions: [],
      created: new Date(),
      updated: new Date(),
      editMode: true
    });
  }

  hideLocation(location: LocationModel){
    setTimeout(() => {
      let idx = this.locations.indexOf(location);
      this.locations.splice(idx, 1);
    }, 500)
  }


  updateLocation(location: LocationModel){
    console.log(location)
    if(location.id == ""){
      this.saveNewLocation(location);
    }else{
      this.locationService.updateLocation(location)
        .then((res: LocationModel) => {
          location.editMode = false;
          let idx = this.locations.indexOf(location);
        })
    }
  }

  editLocation(location: LocationModel){
    for(let d of this.locations){
      if(d !== location && d.editMode){
        this.cancelEdit(d);
      }
    }

    location.editMode = true;
  }

  cancelEdit(location: LocationModel){
    let deleteLocation = location.id == '';

    let idx = this.locations.indexOf(location);
    location.editMode = false;

    if(deleteLocation){
      this.locations.splice(idx, 1);
    }
  }

  saveNewLocation(location: LocationModel){
    this.locationService.addDrink(location)
      .then((res: LocationModel) => {
        let idx = this.locations.indexOf(location);

        location.id = res.id;
        location.host = res.host;
        location.latitude = res.latitude;
        location.longitude = res.longitude;
        location.visitors = [];
        location.created = res.created;
        location.updated = res.updated;

        location.editMode = false;
      });
  }

  deleteLocation(location: LocationModel){
    this.locationService.deleteDrink(location.id)
      .then((res: boolean) => {
        let idx = this.locations.indexOf(location);
        this.locations.splice(idx, 1);
      })
  }

  acceptRequest(visitorRequest: VisitRequest){
    let updateLocation = this.locations.find(element => element.id === visitorRequest.location);

    if(updateLocation !== undefined){
      updateLocation!.visitors.push(visitorRequest.visitor);
      this.locationService.updateLocation(updateLocation)
        .then((res : LocationModel) => {
          console.log(res);
        })
        .catch(error => {
          console.log(error)
        });
      visitorRequest.accepted = true;
      this.visitRequestService.updateVisitRequest(visitorRequest)
        .then((res : VisitRequest) => {
          console.log(res);
        }).catch(error => {
        console.log(error)
      });
    }

  }

}
