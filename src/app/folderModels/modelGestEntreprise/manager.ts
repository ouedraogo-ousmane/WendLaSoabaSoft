 interface Manager {
  id_emp               :number,
  EMAIL                :string,
  PASSWORD             :string,
  ID_ROLE              :number,
  NOMEMP               :string,
  PRENOMEMP           :string,
  TELEPHONE            :string,

}

export class Managers implements Manager{
  PASSWORD!: string;
  id_emp!: number;
  EMAIL!: string;
  ID_ROLE!:number;
  NOMEMP!:string;
  PRENOMEMP! :string;
  TELEPHONE!:string
}
