import { Pipe, PipeTransform } from '@angular/core';
import { Rates } from './rates';


@Pipe({
  name: 'convert'
})
export class ConverterPipe implements PipeTransform {
  rates: any;
  rateArray: Array<string>;
  index: number;
  selected: number;
  constructor() {
    this.rateArray = [];
    this.index = 0;
    this.selected = 0;

}

transform(value: any, args?: any): any {
  // Récupération des taux dans rates.js
  this.rates = new Rates().rates;
  // Récuération de la monnaie courante
  this.rateArray = Object.keys(this.rates);
  // Recherche de l'index de la monnaie choisie dans le rates!;js
  this.index = this.rateArray.indexOf(args);
  // Récupération de la valeur de la devise 
  this.selected = this.rates[Object.keys(this.rates)[this.index]];

  for (const i in this.rates) {
    if (this.rates.hasOwnProperty(i)) {
      //Formule ( Rate of (currency in which we need to convert) / Rate of selected currency ) * number of units
      this.rates[i] = ((this.rates[i] / this.selected) * value).toFixed(2);
    }

  }
  return this.rates;
}

}
