import SHA256 from "crypto-js/sha256.js";

const chain = [];

export const Blockchain = {
  createBlock(previousHash, proof) {
    const block = {
      index: chain.length + 1,
      timestamp: new Date(),
      data: Math.random(),
      proof: proof,
      previous_hash: previousHash,
    };

    chain.push(block);

    console.log("bloco", block);
    console.log("chain", chain);

    return block;
  },
};
