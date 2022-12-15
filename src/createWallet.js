// importando dependências
const bip32 = require("bip32");
const bip39 = require("bip39");
const bitcoin = require("bitcoinjs-lib");

// definir a rede
// rede principal: mainnet
// rete de teste: testnet
const network = bitcoin.networks.testnet;

// derivação de carteiras HD (hierarquical deterministic)
const path = `m/49'/1'/0'/0`;

// gerar mneumônico (seed)
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

// criando raiz da carteira HD
let root = bip32.fromSeed(seed, network);

// criando uma conta: private and public key
let account = root.derivePath(path);
let node = account.derive(0).derive(0);

let btcAddress = bitcoin.payments.p2pkh({
  pubkey: node.publicKey,
  network: network,
}).address;

console.log(
  `
  Carteira gerada!
  Endereço: ${btcAddress}
  Chave privada: ${node.toWIF()}
  Seed: ${mnemonic}
  `
);
