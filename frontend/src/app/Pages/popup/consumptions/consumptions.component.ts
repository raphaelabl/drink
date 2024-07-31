import {Component, inject, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ConsumptionModel} from "../../../model/consumption-model";
import {CommonModule} from "@angular/common";
import {DrinksService} from "../../../shared/services/drinks.service";
import {ConsumptionBaseModel} from "../../../model/consumption-base-model";
import {DrinkModel} from "../../../model/drink-model";
import {AuthService} from "../../../shared/services/auth.service";
import {LocationService} from "../../../shared/services/location.service";
import {LocationModel} from "../../../model/location-model";

@Component({
  selector: 'app-consumptions',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './consumptions.component.html',
  styleUrls: [`./consumptions.component.scss`],
  styles: ``
})
export class ConsumptionsComponent implements OnInit{

  drinkService: DrinksService = inject(DrinksService);
  authService: AuthService = inject(AuthService);
  locationService: LocationService = inject(LocationService);

  userId: string = "";
  constructor(@Inject(MAT_DIALOG_DATA) public consumptions: {locationId: string , consumptions: ConsumptionModel[] }) {}

  ngOnInit(): void {
    this.authService.getUserId()
      .then((res: any)=>{
        this.userId = res.id;
        this.loadDrinks();
      })
  }

  loadDrinks(){
    this.drinkService.getDrinks(`location.id = "${this.consumptions.locationId}"`)
      .then((res: DrinkModel[]) => {

        let nonInsertedDrinks = res.filter(drink => !this.consumptions.consumptions.map(consumption => consumption.drink.id).includes(drink.id))
        this.consumptions.consumptions = [...this.consumptions.consumptions, ...nonInsertedDrinks.map(drink => {
        return {
          id: "",
          drink: drink,
          consumer: this.userId,
          amount: 0,
          created: new Date(),
          updated: new Date(),
        }as ConsumptionModel;
        }
        )];
      })
  }

  addOne(consumption: ConsumptionModel){
    let baseModel = this.convertToBase(consumption);
    if(baseModel.amount === 0){
      baseModel.amount ++;
      console.log(this.consumptions.locationId);
      console.log(baseModel)

      this.drinkService.addConsumption(baseModel)
        .then((res: ConsumptionModel) => {

          this.locationService.getLocationById(this.consumptions.locationId)
            .then((resLocation: LocationModel) => {

              let tmpLoc: LocationModel = resLocation;
              tmpLoc.consumptions = [...tmpLoc.consumptions, res.id]

              this.locationService.updateLocation(tmpLoc)
                .then((res: LocationModel) => {
                });

            })

        });
      consumption.amount ++;
      return;
    }
    baseModel.amount ++;
    this.drinkService.updateConsumption(baseModel)
      .then((res: ConsumptionModel) => {
        console.log(res);
      });
    consumption.amount++;
  }

  convertToBase(consumption: ConsumptionModel): ConsumptionBaseModel{
    return {
      id: consumption.id,
      drink: consumption.drink.id,
      consumer: consumption.consumer,
      amount: consumption.amount,
      created: consumption.created,
      updated: consumption.updated,
    }as ConsumptionBaseModel;
  }

}
