import { Injectable } from '@angular/core';
import {VisitRequest} from "../../model/visit-request";
import PocketBase from 'pocketbase';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class VisitRequestService {

  constructor() { }

  async getVisitRequest(filter: string): Promise<VisitRequest[]>{
    const pb = new PocketBase(environment.baseUrl);
    return await pb.collection('visit_request').getFullList({filter: filter, sort: "created"});
  }

  async sendVisitRequest(visitRequest: VisitRequest): Promise<VisitRequest>{
    const pb = new PocketBase(environment.baseUrl);
    return await pb.collection("visit_request").create(visitRequest);
  }

  async updateVisitRequest(visitRequest: VisitRequest): Promise<VisitRequest>{
    const pb = new PocketBase(environment.baseUrl);
    return await pb.collection("visit_request").update(visitRequest.id, visitRequest);
  }
}
