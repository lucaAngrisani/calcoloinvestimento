import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-investimento",
  templateUrl: "./investimento.component.html",
  styleUrls: ["./investimento.component.css"]
})
export class InvestimentoComponent implements OnInit {
  nn: number = 35; //numero azioni possedute inizialmente
  n: number = 0; //numero azioni possedute
  atm: number = 0; //azioni pagate di tasca propria
  p: number = 150; //prezzo azione
  t: number = 0.05; //tasso annuo
  nMese: number = 0; //numeroMese iterativo
  saldo: number = 0; //saldo da reinvestire
  dividendo: number = 0; //ultimo dividendo calcolato (netto di tasse)
  investimentiAnnuiOpp: number = 1; // 1/investimenti all'anno: 1/2/3/4/6/12/24...
  anniInvestimenti: number = 10; //anni in investimento

  ngOnInit() {
    this.n = this.nn;
    this.nMese = 0;
    this.saldo = 0;
    this.dividendo = 0;
    this.atm = 0;
    var i = 0;
    while (i < 12 * this.anniInvestimenti) {
      i++;
      this.go();
    }
  }

  go() {
    this.nMese++;
    if (this.nMese % 3 == 0) {
      this.dividendo = (this.n * this.p * this.t) / 4;
      this.dividendo = this.dividendo * 0.74;
      this.saldo += this.dividendo;
    }
    if (this.nMese % this.investimentiAnnuiOpp == 0) {
      if (this.saldo - this.p >= 0) {
        while (this.saldo - this.p >= 0) {
          this.saldo -= this.p;
          this.n++;
        }
      } else {
        this.n++;
        this.atm++;
      }
    }
  }
}
