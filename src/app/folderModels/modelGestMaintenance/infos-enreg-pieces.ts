 interface InfosEnregPieces {
  id_maint             :number,
  id_piece             :number,
  date_entree          :Date,
  quantite             :number,
  prix                 :number,

}

export class InfosEnregPiece implements InfosEnregPieces{
  id_maint!: number;
  id_piece!: number;
  date_entree!: Date;
  quantite!: number;
  prix!: number;

}
