interface DepenseAnnuel {
  value:number,
  name:string,
  IMMAT_CAR:string
}

export class DepenseAnnuelle implements DepenseAnnuel{
  value!: number;
  name!: string;
  IMMAT_CAR!:string

}
