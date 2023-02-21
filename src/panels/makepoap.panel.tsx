import styled from "@emotion/styled";
import { Icon20CheckCircleFillGreen, Icon24Camera } from "@vkontakte/icons";
import {
  FormItem,
  FormLayout,
  Panel,
  PanelProps,
  File,
  Input,
  Button,
  NativeSelect,
  FormLayoutGroup,
  SegmentedControl,
  SegmentedControlValue,
  usePlatform,
  Platform,
} from "@vkontakte/vkui";
import { useCallback, useEffect, useRef, useState } from "react";
import places from "../mockups/places";
import { sendToIpfs } from "../utils/ipfs";
import axios from "axios";
import { MakePoapMessage } from "../types/Message";
import { signTypedData, waitForTransaction } from "@wagmi/core";
import { BigNumber } from "@ethersproject/bignumber";
import { push, replace } from "@itznevikat/router";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../reducers/app.reducer";

const Root = styled(Panel)`
  color: var(--content-light);

  & > .vkuiPanel__in {
    background: var(--content-background);
    padding: 42px 13px;

    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`;

const Image = styled.img`
  width: 84px;
  height: 84px;
  align-self: center;
`;

const MakePoapPanel = ({}: PanelProps) => {
  const dispatch = useDispatch();
  const platform = usePlatform();
  const imageRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const coordinatesRef = useRef<HTMLSelectElement>(null);
  const tokenCountRef = useRef<HTMLInputElement>(null);

  const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(false);
  const [isPhotoUploaded, setIsPhotoUploaded] = useState(false);

  const handleInputChange = useCallback(() => {
    if (imageRef.current?.files?.length === 1) setIsPhotoUploaded(true);
    else setIsPhotoUploaded(false);

    if (
      imageRef.current?.files?.length === 1 &&
      titleRef.current?.value &&
      descriptionRef.current?.value &&
      coordinatesRef.current?.value &&
      tokenCountRef.current?.value
    ) {
      setIsAllFieldsFilled(true);
    } else {
      setIsAllFieldsFilled(false);
    }
  }, [imageRef, titleRef, descriptionRef, coordinatesRef, tokenCountRef]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      push("?popout=screen-spinner");

      if (imageRef.current?.files?.length !== 1) return;
      if (!titleRef.current?.value) return;
      if (!descriptionRef.current?.value) return;
      if (!coordinatesRef.current?.value) return;
      if (!tokenCountRef.current?.value) return;

      if (platform !== Platform.VKCOM)
        dispatch(
          setSnackbar({
            text: "Проверьте свой провайдер",
            type: "info",
          })
        );

      const file = imageRef.current.files[0];
      requestImage(file);
    },
    [imageRef, titleRef, descriptionRef, coordinatesRef, tokenCountRef]
  );

  function requestImage(file: File) {
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      makePoap(reader.result)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          dispatch(
            setSnackbar({
              text: "Ошибка при создании POAP",
              type: "error",
            })
          );
        });
    };
  }

  const makeSignature = async ({ baseURI }: { baseURI: string }) => {
    if (!titleRef.current || !tokenCountRef.current) return;

    const messageToSign: MakePoapMessage = {
      domain: {
        name: titleRef.current.value,
        chainId: 5,
        verifyingContract: `0x6bcd17f4933425cd03bc9aea2013373a7e02da7e`,
        version: "1",
      },
      types: {
        CreateCollection: [
          { name: "name", type: "string" },
          { name: "baseURI", type: "string" },
          { name: "maxLimit", type: "uint256" },
        ],
        EIP712Domain: [
          { name: "name", type: "string" },
          { name: "version", type: "string" },
          { name: "chainId", type: "uint256" },
          { name: "verifyingContract", type: "address" },
        ],
      },
      primaryType: "CreateCollection",
      value: {
        name: titleRef.current.value,
        baseURI,
        maxLimit: BigNumber.from(tokenCountRef.current.value),
      },
    };

    console.log(messageToSign);

    return signTypedData(messageToSign);
  };

  async function makePoap(file: string | ArrayBuffer | null) {
    if (!file || !tokenCountRef.current) return;

    // Заливаем файл на IPFS
    const imageCid = await sendToIpfs(file);

    // Создаём POAP
    const poapData = JSON.stringify({
      title: titleRef.current?.value, // name
      description: descriptionRef.current?.value,
      timestamp: Date.now(),
      latitude: coordinatesRef.current?.value.split(", ")[0],
      longitude: coordinatesRef.current?.value.split(", ")[1],
      imgLink: `ipfs://${imageCid}`, // img
    });

    // Заливаем POAP на IPFS
    const poapCid = await sendToIpfs(poapData);

    console.log("poapCid", poapCid);

    // Создаём подпись
    const signature = await makeSignature({ baseURI: `ipfs://${poapCid}` });
    console.log("signature", signature);

    // Хеш транзакции
    let hash = "";

    // Отправляем POAP на сервер и получаем адрес контракта
    const withoutGasData = JSON.stringify({
      POAPData: {
        name: titleRef.current?.value,
        BaseURI: `ipfs://${poapCid}/`,
        maxLimit: parseInt(tokenCountRef.current.value),
      },
      POAPSignature: signature,
    });

    const request = await axios.post(
      "https://opcall.xyz:9998/createGasLessPOAP/",
      withoutGasData,
      { headers: { "Content-Type": "application/json" }, timeout: 9999999999 }
    );

    hash = request.data;

    const receipt = await waitForTransaction({
      chainId: 5,
      hash: `0x${hash.slice(2)}`,
    });

    console.log(receipt);
    const poapCollection = `0x${receipt.logs[0].topics.at(-1)?.slice(-40)}`;

    push("?popout=");

    // Уходим на страницу с картой
    replace("/?modal=poapCollectionQR", {
      poapCollection: `https://vk.com/app51558629/#/mint/${poapCollection}`,
    });
  }

  return (
    <Root>
      <Image src="/imgs/mint.svg" alt="Mint" />
      <FormLayout onSubmit={handleSubmit}>
        <FormItem top="Загрузите изображение">
          <File
            before={<Icon24Camera role="presentation" />}
            size="m"
            accept="image/*"
            getRef={imageRef}
            onInput={handleInputChange}
            after={isPhotoUploaded && <Icon20CheckCircleFillGreen />}
          >
            Открыть галерею
          </File>
        </FormItem>
        <FormItem top="Дайте имя коллекции">
          <Input
            type="text"
            id="Title"
            getRef={titleRef}
            onInput={handleInputChange}
          />
        </FormItem>
        <FormItem top="Краткое описание">
          <Input
            type="text"
            id="Description"
            getRef={descriptionRef}
            onInput={handleInputChange}
          />
        </FormItem>
        <FormItem top="Геолокация события">
          <NativeSelect
            placeholder="Не выбрана"
            id="Coordinates"
            getRef={coordinatesRef}
            onInput={handleInputChange}
          >
            {places.map((place) => (
              <option value={place.value}>{place.label}</option>
            ))}
          </NativeSelect>
        </FormItem>
        <FormItem top="Количество токенов">
          <Input
            type="text"
            getRef={tokenCountRef}
            onInput={handleInputChange}
          />
        </FormItem>
        <FormItem>
          <Button
            size="l"
            stretched
            type="submit"
            disabled={!isAllFieldsFilled}
          >
            Создать
          </Button>
        </FormItem>
      </FormLayout>
    </Root>
  );
};

export default MakePoapPanel;
