import express from "express";

import { Blockchain } from "./blockchain.js";

const app = express();

app.get("/", (req, res) => {
  res.send({
    error: "Wrong route",
    message: "The default mining route is  /mine",
  });
});

app.get("/mine", (req, res) => {
  res.status(200).json({
    chain: Blockchain.createBlock(0, 1),
  });
});
app.get("/last_block", (req, res) => {
  res.status(200).json({
    chain_size: Blockchain.getLastBlock(),
  });
});

app.listen(3000, () => {
  console.log("Rodando na porta 3000");
});
