import cryptoES from "crypto-es";

//import crypto from 'crypto';

/*export default function aesDefinition(message: string): string {
  const key =
    "d0b576e641e865109357b1dc8f6c8f862051942432b589231f43b4e36bf7f022";
  const hex = cryptoES.AES.encrypt(message,key)
  return hex.toString(cryptoES.format.Hex)
}*/

export default function aesDefinition(message:string):string{
  const key = "d0b576e641e865109357b1dc8f6c8f862051942432b589231f43b4e36bf7f022";
  const digest = cryptoES.HmacSHA256(message,key);
  return digest.toString(cryptoES.enc.Hex)
}