 interface DepensesMission {
  id_depense   :number,
  libelle      :string,
  date_creation:Date

}
export class DepenseMission implements DepensesMission{
  id_depense!: number;
  libelle!: string;
  date_creation!: Date;
}
