import { uuid } from "uuidv4";

class User {
  id: string;

  name: string;

  birthDate: Date;

  cpf: number;

  phone: number;

  createdAtDate: Date;

  updatedAtDate: Date;

  constructor({
    name,
    birthDate,
    cpf,
    phone,
  }: Omit<User, "id" | "createdAtDate" | "updatedAtDate">) {
    this.id = uuid();
    this.name = name;
    this.birthDate = birthDate;
    this.cpf = cpf;
    this.phone = phone;
    this.createdAtDate = new Date();
    this.updatedAtDate = new Date();
  }
}

export default User;
