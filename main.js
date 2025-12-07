const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }
    createGenesisBlock() {
        return new Block(0, "07/12/2025", "Genesis Block", "0");
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1];

    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isValid(){
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}
let studentCoin=new Blockchain();
studentCoin.addBlock(new Block(1, "07/12/2025", { usn: "4KV23CS001", name: "Adam", branch: "CSE" , sem: 5}));
studentCoin.addBlock(new Block(2, "07/12/2025", { usn: "4KV23CS0", name: "Eve", branch: "CSE" , sem: 5}));

console.log("Is the chain valid " + studentCoin.isValid());
console.log(JSON.stringify(studentCoin, null, 4));
