 interface RecetteAvecPesage {
  id_produit          :number,
  id_mission          :number,
  id_client           :number,
  num_pesee           :number,
  poid1               :number,
  poid2               :number,

}
export class RecettesAvecPesage implements RecetteAvecPesage{
  id_produit!: number;
  id_mission!: number;
  id_client!: number;
  num_pesee!: number;
  poid1!: number;
  poid2!: number;
}
