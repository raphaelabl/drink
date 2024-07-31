import {DrinkModel} from "./drink-model";

export interface ConsumptionBaseModel {
  id: string;
  drink: any;
  consumer: any;
  amount: number;
  created: Date;
  updated: Date;
}
