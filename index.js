import express from "express";
import { router } from "./routes/todos.js";
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use("/api/todos", router);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`app running on port ${PORT}`));
