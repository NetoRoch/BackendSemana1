import Piu from "../models/piu";

interface CreatePiuDTO {
  idUser: string;
  text: string;
}

class PiusRepository {
  private pius: Piu[];

  constructor() {
    this.pius = [];
  }

  public create({ idUser, text }: CreatePiuDTO): Piu {
    const piu = new Piu({
      idUser,
      text,
    });
    this.pius.push(piu);

    return piu;
  }
  public updatePiu(text: string, id: string): Piu {
    const piu = this.pius.find((piu) => piu.id === id) as Piu;
    const indexOfPiu = this.pius.indexOf(piu);
    this.pius[indexOfPiu].text = text;

    return this.pius[indexOfPiu];
  }

  public deletePiu(id: string): void {
    const piu = this.pius.find((piu) => piu.id === id) as Piu;
    const indexOfPiu = this.pius.indexOf(piu);
    this.pius.splice(indexOfPiu, 1);
  }

  public listOfPius(): Piu[] {
    return this.pius;
  }

  public FindById(id: string): Piu | undefined {
    const exist = this.pius.find((piu) => piu.id === id);
    return exist;
  }

  public FindPiusOfUser(idUser: string): Piu[] {
    const pius = this.pius.filter((piu) => piu.idUser === idUser);
    return pius;
  }
}

export default PiusRepository;
