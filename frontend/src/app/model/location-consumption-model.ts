import {VisitRequest} from "./visit-request";
import {ConsumptionModel} from "./consumption-model";

export interface LocationConsumptionModel {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  host: any;
  hostName: string;
  visitors: any[];
  consumptions: ConsumptionModel[];
  created: Date;
  updated: Date;
  editMode: boolean;
}
