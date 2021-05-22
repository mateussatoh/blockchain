import SHA256 from "crypto-js/sha256.js";

const chain = [];

export const Blockchain = {
  createBlock() {
    if (this.getLastBlock() === 0) {
      const block = {
        index: chain.length + 1,
        timestamp: new Date(),
        data: Math.random(),
        previous_hash: 0,
      };
      //saida nonce e hash
      const minedBlock = this.proofOfWork(block);
      chain.push(minedBlock);
      return chain;
    } else {
      const block = {
        index: chain.length + 1,
        timestamp: new Date(),
        data: Math.random(),
        previous_hash: chain[this.getLastBlock() - 1].hash,
      };
      const minedBlock = this.proofOfWork(block);
      chain.push(minedBlock);
      return chain;
    }
  },
  getLastBlock() {
    return chain.length ? chain.length : 0;
  },

  proofOfWork(block) {
    var isGoldenNonce = false;
    var nonce = 0;

    while (!isGoldenNonce) {
      const blockHash = SHA256(JSON.stringify([block, nonce])).toString();
      if (blockHash.substring(0, 3) === "000") {
        console.log("Achei!!!", blockHash);
        isGoldenNonce = true;
        return {
          index: block.index,
          timestamp: block.timestamp,
          data: block.data,
          previous_hash: block.previous_hash,
          nonce: nonce,
          hash: blockHash,
        };
      } else {
        isGoldenNonce = false;
        nonce++;
      }
    }
  },
};
