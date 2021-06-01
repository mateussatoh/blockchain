import SHA256 from "crypto-js/sha256.js";

const chain = [];

export const Blockchain = {
  createBlock() {
    const block = {
      index: chain.length + 1,
      timestamp: new Date(),
      data: Math.random(),
      previous_hash: 0,
    };
    if (this.getLastBlock() !== 0) {
      block.previous_hash = chain[this.getLastBlock() - 1].hash;
    }
    const proofOfWork = this.proofOfWork(block);
    block.hash = proofOfWork.hash;
    block.nonce = proofOfWork.nonce;
    chain.push(block);
    return chain;
  },

  getLastBlock() {
    return chain.length ? chain.length : 0;
  },

  proofOfWork(block) {
    var isGoldenNonce = false;
    var nonce = 0;
    while (!isGoldenNonce) {
      const blockHash = this.getHash(
        block.index,
        block.timestamp,
        block.data,
        block.previous_hash,
        nonce
      );
      if (blockHash.substring(0, 3) === "000") {
        console.log("Achei!!!", blockHash);
        isGoldenNonce = true;
        return {
          nonce: nonce,
          hash: blockHash,
        };
      } else {
        isGoldenNonce = false;
        nonce++;
      }
    }
  },

  getHash(index, timestamp, data, previous_hash, nonce) {
    return SHA256(
      JSON.stringify([index, timestamp, data, previous_hash, nonce])
    ).toString();
  },

  verifyChain() {
    var isValid = true;
    for (var index in chain) {
      if (
        this.getHash(
          chain[index].index,
          chain[index].timestamp,
          chain[index].data,
          chain[index].previous_hash,
          chain[index].nonce
        ) !== chain[index].hash
      ) {
        isValid = false;
      }
    }
    return isValid;
  },

  fraudChain() {
    chain[1].data = 0.4604;
  },
};
