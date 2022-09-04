 interface DocumentsChauffeur {
  id_doc_chauff        :number,
  id_emp               :number,
  id_vehicule          :number,
  date_expchauff       :Date,
  libelle_docchauff    :string,
  date_creation        :Date
}
export class DocumentChauffeur implements DocumentsChauffeur{
  id_doc_chauff!: number;
  id_emp!: number;
  id_vehicule!: number;
  date_expchauff!: Date;
  libelle_docchauff!: string;
  date_creation!: Date;

}
