 interface InfosEnregPieces {
  maintenanceConcernee             :number,
  nomPiece             :number,
  date_creation          :Date,
  nombre             :number,
  coutUnitaire                 :number,

}

export class InfosEnregPiece implements InfosEnregPieces{
  maintenanceConcernee!: number;
  nomPiece!: number;
  date_creation!: Date;
  nombre!: number;
  coutUnitaire!: number;

}
