export class ConsommationROW {
  electromenager: number;
  chauffageLocaux: number;
  chauffageEaux: number;
  climatisation: number;
  eclairage: number;
  date: Date;

  /**
   *
   * @param elec
   * @param chl
   * @param che
   * @param cli
   * @param ecl
   * @param date
   */
  constructor(elec, chl, che, cli, ecl, date){
    this.electromenager = elec;
    this.chauffageLocaux = chl;
    this.chauffageEaux = che;
    this.climatisation = cli;
    this.eclairage = ecl;
    this.date = date;
  }

  computeTotal(): number {
    const retValue = this.electromenager
      + this.chauffageEaux
      + this.chauffageLocaux
      + this.climatisation
      + this.eclairage;
    return retValue;
  }

  toDateString(): string{
    return this.date.getDate() + '/' + (this.date.getMonth()+1) + '/' + this.date.getFullYear();
  }
}

export class ConsommationAVG extends ConsommationROW {
  year: number;
}
