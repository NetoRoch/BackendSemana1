import { isUuid } from "uuidv4";
import User from "../../models/user";
import UsersRepository from "../../repositories/usersRepository";

interface Request {
  id: string;
}

class FindUserService {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }
  public execute({ id }: Request): User {
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
    return user;
  }
}

export default FindUserService;
