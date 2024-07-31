import {Injectable} from '@angular/core';
import {LocationModel} from '../../model/location-model';
import PocketBase, {ListResult} from 'pocketbase';
import {environment} from '../../../environments/environment';
import {ConsumptionModel} from "../../model/consumption-model";
import {LocationConsumptionModel} from "../../model/location-consumption-model";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }


  async getLocation(filter: string): Promise<LocationModel[]>{
    const pb = new PocketBase(environment.baseUrl);
    return await pb.collection('location').getFullList({filter: filter, sort: 'name'});
  }

  async getLocationById(id: string): Promise<LocationModel>{
    const pb = new PocketBase(environment.baseUrl);
    return await pb.collection('location').getOne(id);
  }

  async getSelectionLocations(filter: string, page: number, pageAmount: number): Promise<LocationModel[]> {
    const pb = new PocketBase(environment.baseUrl);
    const locations: ListResult<LocationModel> = await pb.collection('location').getList(page, pageAmount,{filter: filter, sort: 'name', expand: "host"});
    return locations.items.map(element => ({
      id: element.id,
      name: element.name,
      latitude: element.latitude,
      longitude: element.longitude,
      host: element.host,
      hostName: element.hostName,
      visitors: element.visitors,
      consumptions: element.consumptions,
      created: element.created,
      updated: element.updated,
      editMode: element.editMode
    }as LocationModel))
  }

  async getLocationWithConsumptions(filter: string, userId: string): Promise<LocationConsumptionModel[]>{
    const pb = new PocketBase(environment.baseUrl);
    const locations = await pb.collection('location').getFullList({filter: filter, sort: 'name', expand: "consumptions.drink"})

    return locations.map((location: any) => {
      return {
        ...location,
        consumptions: location.expand ? location.expand.consumptions.map((consumption: any) => {
          return {
            ...consumption,
            drink: consumption.expand ? consumption.expand.drink : null
          } as ConsumptionModel;
        }).filter((element: ConsumptionModel) => element.consumer.id === userId) : []
      } as LocationConsumptionModel;
    });
  }

  async updateLocation(location: LocationModel): Promise<LocationModel>{
    console.log("In Update:" + location)
    const pb = new PocketBase(environment.baseUrl);
    return await pb.collection("location").update(location.id, location);
  }

  async addDrink(location: LocationModel): Promise<LocationModel>{
    const pb = new PocketBase(environment.baseUrl);
    return await pb.collection("location").create(location);
  }

  async deleteDrink(locationId: string): Promise<boolean>{
    const pb = new PocketBase(environment.baseUrl);
    return await pb.collection("location").delete(locationId);
  }


}
