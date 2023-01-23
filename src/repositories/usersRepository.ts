import User from "../models/user";

interface CreateUserDTO {
  name: string;
  birthDate: Date;
  cpf: number;
  phone: number;
}

class UsersRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  public create({ name, birthDate, cpf, phone }: CreateUserDTO) {
    const user = new User({
      name,
      birthDate,
      cpf,
      phone,
    });

    this.users.push(user);

    return user;
  }
  public listOfUsers(): User[] {
    return this.users;
  }

  public deleteUser(id: string): void {
    const user = this.users.find((user) => user.id === id) as User;
    const indexOfUser = this.users.indexOf(user);
    this.users.splice(indexOfUser, 1);
  }

  public updateUser(
    id: string,
    name: string,
    birthDate: Date,
    cpf: number,
    phone: number
  ): User {
    const user = this.users.find((user) => user.id === id) as User;
    const indexOfUser = this.users.indexOf(user);
    this.users[indexOfUser].name = name;
    this.users[indexOfUser].birthDate = birthDate;
    this.users[indexOfUser].cpf = cpf;
    this.users[indexOfUser].phone = phone;
    return this.users[indexOfUser];
  }

  public FindById(id: string): User | undefined {
    const exist = this.users.find((user) => user.id === id);
    return exist;
  }
  public FindByCpf(cpf: number): User | undefined {
    const exist = this.users.find((user) => user.cpf === cpf);
    return exist;
  }
}

export default UsersRepository;
