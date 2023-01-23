import { isUuid } from "uuidv4";
import Piu from "../../models/piu";
import PiusRepository from "../../repositories/piusRepository";

interface Request {
  id: string;
}

class DeletePiuServices {
  private piusRepository: PiusRepository;

  constructor(piusRepository: PiusRepository) {
    this.piusRepository = piusRepository;
  }

  public execute({ id }: Request): Piu {
    if (!id) {
      throw Error("id de busca não enviado");
    }
    if (!isUuid(id)) {
      throw Error("Id invalido");
    }
    const piu = this.piusRepository.FindById(id);
    if (!piu) {
      throw Error("Piu não encontrado");
    }
    this.piusRepository.deletePiu(id);
    return piu;
  }
}

export default DeletePiuServices;
