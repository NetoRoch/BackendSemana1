import { response, Router } from "express";
import CreatePiuServices from "../services/PiuServices/CreatePiuServices";
import DeletePiuServices from "../services/PiuServices/DeletePiuServices";
import FindPiuServices from "../services/PiuServices/FindPiuServices";
import UpdatePiuServices from "../services/PiuServices/UpdatePiuServices";
import { piusRepository, usersRepository } from "../repositories";
import FindPiusOfUSerServices from "../services/PiuServices/FindPiusOfUserServices";

const piusRouter = Router();

piusRouter.get("/", (request, response) => {
  const pius = piusRepository.listOfPius();
  return response.json(pius);
});

piusRouter.post("/", (request, response) => {
  try {
    const { idUser, text } = request.body;

    const createPiu = new CreatePiuServices(piusRepository, usersRepository);

    const piu = createPiu.execute({ idUser, text });

    return response.json(piu);
  } catch (err) {
    if (err instanceof Error) {
      return response.status(400).json({ error: err.message });
    }
    return response.status(400).json({ error: "Unexpected error." });
  }
});

piusRouter.put("/:id", (request, response) => {
  try {
    const { id } = request.params;
    const { text } = request.body;
    const updatePiu = new UpdatePiuServices(piusRepository);
    const piu = updatePiu.execute({ id, text });
    return response.json(piu);
  } catch (err) {
    if (err instanceof Error) {
      return response.status(400).json({ error: err.message });
    }
    return response.status(400).json({ error: "Unexpected error." });
  }
});

piusRouter.delete("/:id", (request, response) => {
  try {
    const { id } = request.params;
    const deletePiu = new DeletePiuServices(piusRepository);
    const piu = deletePiu.execute({ id });
    return response.json(piu);
  } catch (err) {
    if (err instanceof Error) {
      return response.status(400).json({ error: err.message });
    }
    return response.status(400).json({ error: "Unexpected error." });
  }
});

piusRouter.get("/:id", (request, response) => {
  try {
    const { id } = request.params;
    const findPiu = new FindPiuServices(piusRepository);
    const piu = findPiu.execute({ id });
    return response.json(piu);
  } catch (err) {
    if (err instanceof Error) {
      return response.status(400).json({ error: err.message });
    }
    return response.status(400).json({ error: "Unexpected error." });
  }
});

piusRouter.get("/user/:idUser", (request, response) => {
  try {
    const { idUser } = request.params;
    const findUser = new FindPiusOfUSerServices(
      piusRepository,
      usersRepository
    );
    const pius = findUser.execute({ idUser });
    return response.json(pius);
  } catch (err) {
    if (err instanceof Error) {
      return response.status(400).json({ error: err.message });
    }
    return response.status(400).json({ error: "Unexpected error." });
  }
});

export default piusRouter;
