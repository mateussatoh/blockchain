import express from "express";

import { Blockchain } from "./blockchain.js";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    chain: Blockchain.createBlock(),
  });
});
app.get("/verify-chain", (req, res) => {
  res.status(200).json({
    chain: Blockchain.verifyChain(),
  });
});
app.get("/fraud", (req, res) => {
  res.status(200).json({
    chain: Blockchain.fraudChain(),
  });
});

app.listen(3000, () => {
  console.log("Rodando na porta 3000");
});
