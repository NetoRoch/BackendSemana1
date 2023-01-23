import { isUuid } from "uuidv4";
import Piu from "../../models/piu";
import PiusRepository from "../../repositories/piusRepository";
import UsersRepository from "../../repositories/usersRepository";

interface Request {
  idUser: string;
  text: string;
}

class CreatePiuServices {
  private piusRepository: PiusRepository;
  private usersRepository: UsersRepository;

  constructor(
    piusRepository: PiusRepository,
    usersRepository: UsersRepository
  ) {
    this.piusRepository = piusRepository;
    this.usersRepository = usersRepository;
  }
  public execute({ idUser, text }: Request): Piu {
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
    if (!text) {
      throw Error("O texto é obrigatório.");
    }
    if (!(text.length < 140)) {
      throw Error("O texto tem que ter menos de 140 caracteres.");
    }

    const piu = this.piusRepository.create({ idUser, text });

    return piu;
  }
}

export default CreatePiuServices;
