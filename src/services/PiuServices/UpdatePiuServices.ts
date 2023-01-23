import { isUuid } from "uuidv4";
import Piu from "../../models/piu";
import PiusRepository from "../../repositories/piusRepository";

interface Request {
  id: string;
  text: string;
}

class UpdatePiuServices {
  private piusRepository: PiusRepository;

  constructor(piusRepository: PiusRepository) {
    this.piusRepository = piusRepository;
  }
  public execute({ id, text }: Request): Piu {
    if (!id) {
      throw Error("id de busca não enviado.");
    }
    if (!isUuid(id)) {
      throw Error("Id invalido.");
    }
    const piu = this.piusRepository.FindById(id);
    if (!piu) {
      throw Error("Piu não encontrado.");
    }
    if (!text) {
      throw Error("O texto é obrigatório.");
    }
    if (!(text.length < 140)) {
      throw Error("O texto tem que ter menos de 140 caracteres.");
    }
    this.piusRepository.updatePiu(text, id);
    return piu;
  }
}

export default UpdatePiuServices;
