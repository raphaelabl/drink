import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeoService {

  constructor() { }

  async getCurrentLocation() {
    return await new Promise<any>((resolve, reject) => {
      if (navigator.geolocation) {
        const options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }

        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (position) {

              let lat = position.coords.latitude;
              let lng = position.coords.longitude;

              const location = {
                lat: lat,
                long: lng,
              };
              resolve(location);
            }
          },
          (error) => {console.log(error)},
          options
        );
      } else {
        reject('Geolocation is not supported by this browser.');
      }
    });
  }

}
