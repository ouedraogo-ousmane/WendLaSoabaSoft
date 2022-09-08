 interface Pieces {
  id                   :number,
  nom                  :string,
  dvie_piece           :number,
  date_creation        :Date
}

export class Piece implements Pieces{
  id!: number;
  nom!: string;
  dvie_piece!: number;
  date_creation!: Date;

}
