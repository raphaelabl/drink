import {DrinkModel} from "./drink-model";

export interface ConsumptionModel {
  id: string;
  drink: DrinkModel;
  consumer: any;
  amount: number;
  created: Date;
  updated: Date;
}
