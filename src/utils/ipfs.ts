import axios from "axios";
import { create } from "ipfs-http-client";

const INFURA_ID = "2GAbK7KQ6k3v5qUfi9Z0L84TpEl";
const INFURA_SECRET_KEY = "2c56f751a84475e86cb52059b0b9789e";
const auth =
  "Basic " +
  Buffer.from(INFURA_ID + ":" + INFURA_SECRET_KEY).toString("base64");

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: { authorization: auth },
});

async function sendToIpfs(data: string | ArrayBuffer) {
  const created = await client.add(data);
  return created.path;
}

async function getJsonFromIpfs<T>(hash: string) {
  const response = await axios.get("https://opcall.xyz:9998/get_ipfs/" + hash, {
    timeout: 9999999999,
  });
  return JSON.parse(response.data) as T;
}

function getImageUrlFromIpfs(hash: string) {
  return "https://ipfs.io/ipfs/" + hash;
}

export { sendToIpfs, getJsonFromIpfs, getImageUrlFromIpfs };
