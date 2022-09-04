 interface Pieces {
  id_piece             :number,
  nom_piece            :string,
  dvie_piece           :number,
  date_creation        :Date
}

export class Piece implements Pieces{
  id_piece!: number;
  nom_piece!: string;
  dvie_piece!: number;
  date_creation!: Date;

}
