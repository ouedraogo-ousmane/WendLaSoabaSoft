 interface Employees {
   id_emp        : number ,
   id_parc       : number,
   nom           :string,
   prenom        :string,
   telephone     :string,
   password      :string,
   date_creation : Date
}

export class Employee implements Employees{
  id_emp!: number;
  id_parc!: number;
  nom!: string;
  prenom!: string;
  telephone!: string;
  password!: string;
  date_creation!: Date;

}
