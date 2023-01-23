import { isUuid } from "uuidv4";
import User from "../../models/user";
import UsersRepository from "../../repositories/usersRepository";
import TestaCPF from "../../utils/testeCPF";

interface Request {
  id: string;
  name: string;
  birthDate: Date;
  cpf: number;
  phone: number;
}

class UptadeUserService {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }
  public execute({ id, name, birthDate, cpf, phone }: Request): User {
    if (!id) {
      throw Error("id de busca não enviado");
    }
    if (!isUuid(id)) {
      throw Error("Id invalido");
    }
    const user = this.usersRepository.FindById(id);
    if (!user) {
      throw Error("Usuário não encontrado");
    }

    if (this.usersRepository.FindByCpf(cpf) && (user.cpf !== cpf)) {
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
    this.usersRepository.updateUser(id, name, birthDate, cpf, phone);

    return user;
  }
}

export default UptadeUserService;
