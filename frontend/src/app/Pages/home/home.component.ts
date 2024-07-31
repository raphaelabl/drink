import { Component, OnInit, inject } from '@angular/core';
import { DrinksService } from '../../shared/services/drinks.service';
import { DrinkModel } from '../../model/drink-model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import {LocationService} from "../../shared/services/location.service";
import {LocationModel} from "../../model/location-model";
import {VisitRequest} from "../../model/visit-request";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {ConsumptionModel} from "../../model/consumption-model";
import {VisitRequestService} from "../../shared/services/visit-request.service";
import {LocationConsumptionModel} from "../../model/location-consumption-model";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConsumptionsComponent} from "../popup/consumptions/consumptions.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  styles: ``
})
export class HomeComponent implements OnInit{
  locationService: LocationService = inject(LocationService);
  authService: AuthService = inject(AuthService);
  visitRequestService: VisitRequestService = inject(VisitRequestService)
  dialog : MatDialog = inject(MatDialog);

  locations: LocationConsumptionModel[] = [];
  selectionLocations: LocationModel[] = [];

  selectedLocation: any;

  userId: string = '';

  ngOnInit(): void {
    this.activate();
  }

  activate() {
    this.authService.getUserId()
      .then((res: any) => {
        this.userId = res.id;
        this.getConsumptionList()
        this.getSampleLocations();
      })
  }

  getSampleLocations(){
    this.locationService.getSelectionLocations(``, 1, 30)
      .then((res:LocationModel[]) => {
        this.selectionLocations = res;
      })
      .catch((err) => {
        console.log(err);
      })
  }

  getConsumptionList(){
    this.locationService.getLocationWithConsumptions(`visitors.id ?= "${this.userId}"`, this.userId)
      .then((res:LocationConsumptionModel[]) => {
        this.locations = res;

      })
      .catch((err) => {
        console.log(err);
      })
  }

  sendLocationRequest(){
    const tmpLoc = this.selectionLocations.find(element => element.id === this.selectedLocation)
    console.log(this.locations)
    console.log(this.selectedLocation)

    const visitRequest: VisitRequest = {
      id: undefined!,
      created: new Date(),
      updated: new Date(),
      visitor: this.userId,
      visitorName: "",
      location: this.selectedLocation,
      locationName: tmpLoc!.name,
      accepted: false
    }

    this.visitRequestService.sendVisitRequest(visitRequest)
      .then((res: VisitRequest) => {
      })
      .catch((error: any) => console.log(error))
  }

  getTotalConsumptionPrice(consumptions: ConsumptionModel[]){
    let totalPrice: number = 0;
    consumptions.forEach(element => {
      totalPrice += element.amount * element.drink.price;
    })
    return totalPrice
  }

  openConsumptions(locationId: string, consumptions: ConsumptionModel[]){
    const dialogRef = this.dialog.open(ConsumptionsComponent, {
      height: "800px",
      width: "1000px",
      data: {locationId: locationId ,consumptions: consumptions}
    })
  }

  isVisited(l: LocationModel){
    return this.locations.filter(element => element.id === l.id).length !== 0
  }

  protected readonly length = length;
}
