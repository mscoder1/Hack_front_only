import { BigNumber } from "@ethersproject/bignumber";

export interface MakePoapMessage {
  domain: {
    chainId: number;
    name: string;
    verifyingContract: `0x${string}`;
    version: string;
  };
  types: {
    CreateCollection: [
      { name: "name"; type: "string" },
      { name: "baseURI"; type: "string" },
      { name: "maxLimit"; type: "uint256" }
    ];
    EIP712Domain: [
      { name: "name"; type: "string" },
      { name: "version"; type: "string" },
      { name: "chainId"; type: "uint256" },
      { name: "verifyingContract"; type: "address" }
    ];
  };
  primaryType: string;
  value: {
    name: string;
    baseURI: string;
    maxLimit: BigNumber;
  };
}

export interface GetPoapMessage {
  domain: {
    chainId: number;
    name: string;
    verifyingContract: `0x${string}`;
    version: string;
  };
  types: {
    POAPMint: [
      { name: "minter"; type: "address" },
      { name: "contractAddress"; type: "address" }
    ];
    EIP712Domain: [
      { name: "name"; type: "string" },
      { name: "version"; type: "string" },
      { name: "chainId"; type: "uint256" },
      { name: "verifyingContract"; type: "address" }
    ];
  };

  primaryType: string;
  value: {
    minter: `0x${string}`;
    contractAddress: `0x${string}`;
  };
}
