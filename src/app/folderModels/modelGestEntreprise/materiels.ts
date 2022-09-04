 interface Materiels {
  id_materiel          :number,
  id_parc              :number,
  designation          :string,
}

export class Materiel implements Materiels {
  id_materiel!: number;
  id_parc!: number;
  designation!: string;

}
