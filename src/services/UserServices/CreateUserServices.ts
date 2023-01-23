import User from "../../models/user";
import UsersRepository from "../../repositories/usersRepository";
import TestaCPF from "../../utils/testeCPF";

interface Request {
  name: string;
  birthDate: Date;
  cpf: number;
  phone: number;
}

class CreateUserService {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }
  public execute({ name, birthDate, cpf, phone }: Request): User {
    if (this.usersRepository.FindByCpf(cpf)) {
      throw Error("CPF já utilizado por outro usuário.");
    }
    if (!cpf) {
      throw Error("O cpf é Obrigatório.");
    }
    if (!TestaCPF(cpf.toString())) {
      throw Error("CPF invalido.");
    }
    if (!name) {
      throw Error("O nome é Obrigatório.");
    }
    if (!phone) {
      throw Error("O telefone é Obrigatório.");
    }
    if (!birthDate) {
      throw Error("A data de aniversário é Obrigatória.");
    }
    const user = this.usersRepository.create({
      name,
      birthDate,
      cpf,
      phone,
    });
    return user;
  }
}

export default CreateUserService;
