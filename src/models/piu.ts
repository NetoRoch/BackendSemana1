import { uuid } from "uuidv4";

class Piu {
  id: string;

  idUser: string;

  text: string;

  createdAtDate: Date;

  updatedAtDate: Date;

  constructor({
    idUser,
    text,
  }: Omit<Piu, "id" | "createdAtDate" | "updatedAtDate">) {
    this.idUser = idUser;
    this.text = text;
    this.id = uuid();
    this.createdAtDate = new Date();
    this.updatedAtDate = new Date();
  }
}

export default Piu;
