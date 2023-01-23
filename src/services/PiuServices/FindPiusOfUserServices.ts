import { isUuid } from "uuidv4";
import Piu from "../../models/piu";
import PiusRepository from "../../repositories/piusRepository";
import UsersRepository from "../../repositories/usersRepository";

interface Request {
  idUser: string;
}

class FindPiusOfUSerServices {
  private piusRepository: PiusRepository;
  private usersRepository: UsersRepository;

  constructor(
    piusRepository: PiusRepository,
    usersRepository: UsersRepository
  ) {
    this.piusRepository = piusRepository;
    this.usersRepository = usersRepository;
  }
  public execute({ idUser }: Request): Piu[] {
    const user = this.usersRepository.FindById(idUser);
    if (!idUser) {
      throw Error("id de busca não enviado.");
    }
    if (!isUuid(idUser)) {
      throw Error("Id invalido.");
    }
    if (!user) {
      throw Error("Usuário não encontrado.");
    }
    const pius = this.piusRepository.FindPiusOfUser(idUser);
    if (!pius) {
      throw Error("Usuário não possui pius.");
    }
    return pius;
  }
}

export default FindPiusOfUSerServices;
