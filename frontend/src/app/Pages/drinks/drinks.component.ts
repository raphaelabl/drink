import { Component, OnInit, inject } from '@angular/core';
import { DrinksService } from '../../shared/services/drinks.service';
import { DrinkModel } from '../../model/drink-model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { LocationService } from '../../shared/services/location.service';
import { LocationModel } from '../../model/location-model';
@Component({
  selector: 'app-drinks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './drinks.component.html',
  styles: ``
})
export class DrinksComponent implements OnInit{

  drinkService: DrinksService = inject(DrinksService);
  locationService: LocationService = inject(LocationService);
  authService: AuthService = inject(AuthService);

  selectedLocation: any;

  drinks: Array<DrinkModel> = new Array<DrinkModel>();
  drinksHold: Array<string> = new Array<string>();

  locations: LocationModel[] = [];

  userId: string = '';

  ngOnInit(): void {
    this.activate();
  }

  activate(){

    this.authService.getUserId()
    .then((res: any) => {
      this.userId = res.id;

      this.locationService.getLocation(`host.id = "${this.userId}"`)
      .then((res: LocationModel[]) => {
        this.locations = res;
      })

      this.drinkService.getDrinks(`location.host.id = "${this.userId}"`)
      .then((res: DrinkModel[]) => {
        for(let t of res){
          this.drinks.push(t)
          this.drinksHold.push(t.name)
        }
      })
      .catch((err) => {
        console.log(err);
      })
    })


  }

  getDrinks(){
    this.drinks = []
    this.drinkService.getDrinks((this.selectedLocation === null || this.selectedLocation === undefined || this.selectedLocation === '')?`location.host.id = "${this.userId}"`:`location.id = "${this.selectedLocation}"`)
    .then((res: DrinkModel[]) => {
      for(let t of res){
        this.drinks.push(t)
        this.drinksHold.push(t.name)
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  async addDrink() {

    this.drinks.push({
      id: '',
      name: '',
      price: 0,
      owner: this.userId,
      location: (this.selectedLocation === null || this.selectedLocation === undefined || this.selectedLocation === '')?0:this.selectedLocation,
      created: new Date(),
      updated: new Date(),
      editMode: true });

    this.drinksHold.push('');
  }

  hideDrink(drink: DrinkModel){
    setTimeout(() => {
      let idx = this.drinks.indexOf(drink);
      this.drinks.splice(idx, 1);
    }, 500)
  }


  updateDrink(drink: DrinkModel){
    if(drink.id == ""){
      this.saveNewDrink(drink);
    }else{
      this.drinkService.updateDrink(drink)
      .then((res: DrinkModel) => {
        drink.editMode = false;
        let idx = this.drinks.indexOf(drink);
        this.drinksHold[idx] = drink.name;
      })
    }
  }

  editDrink(drink: DrinkModel){
    for(let d of this.drinks){
      if(d !== drink && d.editMode){
        this.cancelEdit(d);
      }
    }

    drink.editMode = true;
  }

  cancelEdit(drink: DrinkModel){
    let deleteDrink = drink.id == '';

    let idx = this.drinks.indexOf(drink);
    drink.name = this.drinksHold[idx];
    drink.editMode = false;

    if(deleteDrink){
      this.drinks.splice(idx, 1);
      this.drinksHold.splice(idx, 1);
    }
  }

  saveNewDrink(drink: DrinkModel){
    this.drinkService.addDrink(drink)
    .then((res: DrinkModel) => {
      let idx = this.drinks.indexOf(drink);

      drink.id = res.id;
      drink.created = res.created;
      drink.updated = res.updated;
      drink.owner = res.owner;

      this.drinksHold[idx] = drink.name;

      drink.editMode = false;
    });
  }

  deleteTask(drink: DrinkModel){
    this.drinkService.deleteDrink(drink.id)
    .then((res: boolean) => {
      let idx = this.drinks.indexOf(drink);
      this.drinks.splice(idx, 1);
      this.drinksHold.splice(idx, 1);
    })
  }
}
