import { Router } from "express";
import usersRouter from "./user.routes";
import piusRouter from "./piu.routes";

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/pius", piusRouter);

export default routes;
