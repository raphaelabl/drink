import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { environment } from '../../../environments/environment';
import { DrinkModel } from '../../model/drink-model';
import { filter } from 'rxjs';
import {ConsumptionModel} from "../../model/consumption-model";
import {ConsumptionBaseModel} from "../../model/consumption-base-model";

@Injectable({
  providedIn: 'root'
})
export class DrinksService {

  constructor() { }

  async getDrinks(fitler: string): Promise<DrinkModel[]>{
    console.log("drink:"+fitler)
    const pb = new PocketBase(environment.baseUrl);
    return await pb.collection('drinks').getFullList({filter: fitler, sort: 'name'});
  }

  async updateDrink(drink: DrinkModel): Promise<DrinkModel>{
    const pb = new PocketBase(environment.baseUrl);
    return await pb.collection("drinks").update(drink.id, drink);
  }

  async addDrink(drink: DrinkModel): Promise<DrinkModel>{
    const pb = new PocketBase(environment.baseUrl);
    return await pb.collection("drinks").create(drink);
  }

  async deleteDrink(drinkId: string): Promise<boolean>{
    const pb = new PocketBase(environment.baseUrl);
    return await pb.collection("drinks").delete(drinkId);
  }

  async addConsumption(consumption: ConsumptionBaseModel): Promise<ConsumptionModel>{
    const pb = new PocketBase(environment.baseUrl);
    return await pb.collection("consumptions").create(consumption);
  }
  async updateConsumption(consumption: ConsumptionBaseModel): Promise<ConsumptionModel>{
    const pb = new PocketBase(environment.baseUrl);
    return await pb.collection("consumptions").update(consumption.id, consumption);
  }

}
