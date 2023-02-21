import styled from "@emotion/styled";
import { Button, Panel, PanelProps } from "@vkontakte/vkui";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers/store";
import { useMeta } from "@itznevikat/router";
import { signTypedData } from "@wagmi/core";
import { useAccount, useContractRead } from "wagmi";
import ABI from "../abis/VKPOAPABI.json";
import { useEffect, useMemo, useState } from "react";
import { getImageUrlFromIpfs, getJsonFromIpfs } from "../utils/ipfs";
import { Poap, setSnackbar } from "../reducers/app.reducer";
import { GetPoapMessage } from "../types/Message";
import axios from "axios";

const Root = styled(Panel)`
  color: var(--content-light);

  & > .vkuiPanel__in {
    background: var(--content-background);
    padding: 42px 13px;

    display: flex;
    flex-direction: column;
    gap: 8px;

    text-align: center;
  }
`;

const Image = styled.img`
  width: 75%;
  align-self: center;
  border-radius: var(--border-radius);
`;

const GetPoapPanel = ({}: PanelProps) => {
  const { address } = useAccount();
  const { poapCollection } = useMeta();
  const appData = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();
  const [poap, setPoap] = useState<Poap>({
    title: "",
    description: "",
    timestamp: 0,
    latitude: "",
    longitude: "",
    imgLink: "",
  });

  const contract = useContractRead({
    address: poapCollection,
    abi: ABI,
    chainId: 5,
    functionName: "tokenURI",
    args: [1],
  });

  useEffect(() => {
    if (!contract.data) return;
    const uri = String(contract.data).split("//")[1].split("/")[0];

    getJsonFromIpfs<Poap>(uri).then((json) => {
      const image = json.imgLink;
      const imageUri = image.split("//")[1].split("/")[0];
      setPoap({
        ...json,
        img: getImageUrlFromIpfs(imageUri),
      });
    });
  }, [contract.data]);

  const handleClick = () => {
    if (!poapCollection || !address || !poap) return;

    const messageToSign: GetPoapMessage = {
      domain: {
        name: poap.title,
        chainId: 5,
        verifyingContract: `0x${poapCollection.substring(2)}`,
        version: "1",
      },
      types: {
        POAPMint: [
          { name: "minter", type: "address" },
          { name: "contractAddress", type: "address" },
        ],
        EIP712Domain: [
          { name: "name", type: "string" },
          { name: "version", type: "string" },
          { name: "chainId", type: "uint256" },
          { name: "verifyingContract", type: "address" },
        ],
      },
      primaryType: "POAPMint",
      value: {
        minter: `0x${address.substring(2)}`,
        contractAddress: `0x${poapCollection.substring(2)}`,
      },
    };

    console.log(messageToSign);

    signTypedData(messageToSign)
      .then((signature) => {
        console.log("signature", signature);

        const data = JSON.stringify({
          mintInformation: {
            minter: address,
            contract_address: poapCollection,
          },
          mintSignature: signature,
        });

        console.log("data", JSON.parse(data));

        axios
          .post("https://opcall.xyz:9998/mintingPOAP/", data, {
            headers: { "Content-Type": "application/json" },
            timeout: 9999999999,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
            dispatch(
              setSnackbar({ text: "Ошибка получения POAP", type: "error" })
            );
          });
      })
      .catch((error) => {
        console.log(error);
        dispatch(setSnackbar({ text: "Ошибка получения POAP", type: "error" }));
      });
  };

  return (
    <Root>
      <h1>Ваш поап:</h1>
      <p>{poapCollection}</p>
      <Image src={poap.img} />
      <h2>Название: {poap.title}</h2>
      <h2>Описание: {poap.description}</h2>
      <Button onClick={handleClick}>Получить POAP</Button>
    </Root>
  );
};

export default GetPoapPanel;
