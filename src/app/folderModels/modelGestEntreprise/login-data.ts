 interface LoginData {
  id:number,
  nom:string,
  password:string,
  email:string,
  role:string,
}

export class LoginDatas implements LoginData{
  id!: number;
  nom!: string;
  password!: string;
  email!: string;
  role!: string;

}
