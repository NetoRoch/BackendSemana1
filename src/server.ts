import express from "express";
import routes from "./routes";

const app = express();

app.use(express.json());

app.use(routes);

app.get("/", (request, response) => {
  return response.json({ message: "opa começamos" });
});

app.listen(3334, () => {
  console.log("😁😁😁Atualizou😁😁😁");
});
