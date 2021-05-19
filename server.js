import express from "express";

import { Blockchain } from "./blockchain.js";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    error: "Wrong route",
    message: "The default mining route is  /mine",
  });
});

app.get("/mine", (req, res) => {
  Blockchain.createBlock(0, 1);

  //cria o bloco genese
});

app.listen(3000, () => {
  console.log("Rodando na porta 3000");
});
