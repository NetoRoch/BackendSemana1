import { Router } from "express";
import { parseISO } from "date-fns";
import CreateUserService from "../services/UserServices/CreateUserServices";
import FindUserService from "../services/UserServices/DeleteUserServices";
import UptadeUserService from "../services/UserServices/UpdateUserServices";
import DeleteUserService from "../services/UserServices/DeleteUserServices";
import { usersRepository } from "../repositories";

const usersRouter = Router();

usersRouter.get("/", (request, response) => {
  const users = usersRepository.listOfUsers();
  response.json(users);
});

usersRouter.post("/", (request, response) => {
  try {
    const { name, birthDate, cpf, phone } = request.body;
    const parsedBirthDate = parseISO(birthDate);

    const createUser = new CreateUserService(usersRepository);

    const user = createUser.execute({
      name,
      birthDate: parsedBirthDate,
      cpf,
      phone,
    });

    return response.json(user);
  } catch (err) {
    if (err instanceof Error) {
      return response.status(400).json({ error: err.message });
    }
    return response.status(400).json({ error: "Unexpected error." });
  }
});

usersRouter.get("/:id", (request, response) => {
  try {
    const { id } = request.params;
    const findUser = new FindUserService(usersRepository);
    const user = findUser.execute({ id });
    return response.json(user);
  } catch (err) {
    if (err instanceof Error) {
      return response.status(400).json({ error: err.message });
    }
    return response.status(400).json({ error: "Unexpected error." });
  }
});

usersRouter.put("/:id", (request, response) => {
  try {
    const { id } = request.params;
    const { name, birthDate, cpf, phone } = request.body;
    const updateUser = new UptadeUserService(usersRepository);
    const user = updateUser.execute({ id, name, birthDate, cpf, phone });
    return response.json(user);
  } catch (err) {
    if (err instanceof Error) {
      return response.status(400).json({ error: err.message });
    }
    return response.status(400).json({ error: "Unexpected error." });
  }
});

usersRouter.delete("/:id", (request, response) => {
  try {
    const { id } = request.params;
    const findUser = new DeleteUserService(usersRepository);
    const user = findUser.execute({ id });
    return response.json(user);
  } catch (err) {
    if (err instanceof Error) {
      return response.status(400).json({ error: err.message });
    }
    return response.status(400).json({ error: "Unexpected error." });
  }
});


export default usersRouter;
