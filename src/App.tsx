import { useEffect, useMemo, useState } from "react";
import {
  useAdaptivity,
  ViewWidth,
  SplitLayout,
  SplitCol,
  ScreenSpinner,
} from "@vkontakte/vkui";
import {
  Match,
  Epic,
  View,
  useInitialLocation,
  replace,
  matchPopout,
  useParams,
  push,
} from "@itznevikat/router";
import appReducer, {
  setUserData,
  setPoaps,
  setCollections,
} from "./reducers/app.reducer";
import BottomMenu from "./components/BottomMenu";
import MapPanel from "./panels/map.panel";
import ProfilePanel from "./panels/profile.panel";
import CreatorProfilePanel from "./panels/creatorprofile.panel";
import bridge from "@vkontakte/vk-bridge";
import { useDispatch, useSelector } from "react-redux";
import { RootDispatch, RootState } from "./reducers/store";
import ModalController from "./modals";
import MakePoapPanel from "./panels/makepoap.panel";
import GetPoapPanel from "./panels/getpoap.panel";
import { useAccount, useContractRead, useContractReads } from "wagmi";
import { Snackbar } from "./components/Snackbar";

import ABI2 from "./abis/POAPFactoryABI.json";
import ABI3 from "./abis/VKPOAPABI.json";
import { getImageUrlFromIpfs, getJsonFromIpfs } from "./utils/ipfs";
import Svgs from "./components/Svgs";
import { Web3Button } from "@web3modal/react";

interface Poap {
  title: string;
  description: string;
  timestamp: number;
  latitude: string;
  longitude: string;
  imgLink: string;
  img?: string;
}

function App() {
  const { collections, loading } = useSelector((state: RootState) => state.app);
  const dispatch: RootDispatch = useDispatch();
  const { viewWidth } = useAdaptivity();
  const initialLocation = useInitialLocation();
  const { isConnected } = useAccount();
  const { popout = null } = useParams();

  const [contracts, setContracts] = useState<string[]>([]);

  // Ставим лоадер, пока не получим все коллекции
  useEffect(() => {
    setTimeout(() => {
      push("?popout=screen-spinner");
    }, 200);
  }, []);

  // Проверяем, на десктопе ли мы
  const isDesktop = useMemo(() => {
    if (!viewWidth) return false;
    return viewWidth >= ViewWidth.SMALL_TABLET;
  }, [viewWidth]);

  // Если мы пришли по ссылке с mint, то переходим на страницу минтинга
  const mint = initialLocation.hash.match(/mint\/0x([^&]{40})/);
  if (mint) {
    setTimeout(() => {
      replace(`/mint`, {
        poapCollection: "0x" + mint[1],
      });
    }, 200);
  }

  // Получаем все коллекции
  useContractRead({
    address: "0x6bcd17f4933425cd03bc9aea2013373a7e02da7e",
    abi: ABI2,
    functionName: "allCollections",
    chainId: 5,
    onSettled(data: string[] | undefined, error: Error | null) {
      if (error) return console.error(error);
      if (!data) return;
      dispatch(setCollections(data));
      console.log("collections", data);
    },
  });

  // Получаем все контракты
  useContractReads({
    contracts: collections.map((address) => ({
      abi: ABI3,
      chainId: 5,
      functionName: "tokenURI",
      args: [1],
      address: `0x${address.substring(2)}`,
    })),
    onSettled(data: string[] | undefined, error: Error | null) {
      if (error) return console.error(error);
      if (!data) return;
      const filteredData = data.filter((contract) => contract !== "BASEURI");
      setContracts(filteredData);
      console.log("contracts", filteredData);
    },
  });

  // Получаем все POAP
  useEffect(() => {
    const poaps = contracts.map(async (contract) => {
      const ipfsAddress = contract.substring(7, contract.length - 1);
      const data = await getJsonFromIpfs<Poap>(ipfsAddress);
      const ipfsImageAddress = data.imgLink.substring(7, contract.length - 1);
      return { ...data, img: getImageUrlFromIpfs(ipfsImageAddress) };
    });

    Promise.all(poaps).then((data) => {
      push("?popout=");
      dispatch(setPoaps(data));
    });
  }, [contracts]);

  // Попауты
  const popoutController = matchPopout(popout, [
    <ScreenSpinner id="screen-spinner" />,
  ]);

  // Получаем данные пользователя
  useEffect(() => {
    bridge.send("VKWebAppGetUserInfo").then((data) => {
      dispatch(
        setUserData({
          firstName: data.first_name,
          lastName: data.last_name,
          avatar: data.photo_200,
        })
      );
    });
  }, []);

  return isConnected ? (
    <>
      <Svgs />
      <Match initialURL="/" disableSetLocation>
        <SplitLayout modal={<ModalController />} popout={popoutController}>
          <SplitCol animate={!isDesktop} width="100%" maxWidth="100%">
            <Epic id="/" tabbar={<BottomMenu />}>
              <View id="/">
                <MapPanel id="/" />
                <ProfilePanel id="/profile" />
                <GetPoapPanel id="/mint" />
              </View>
              <View id="/creator">
                <CreatorProfilePanel id="/profile" />
                <MakePoapPanel id="/make" />
              </View>
            </Epic>
          </SplitCol>
        </SplitLayout>
      </Match>
      {/* <Snackbar /> */}
    </>
  ) : (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
        background: "var(--content-background)",
      }}
    >
      <Web3Button />
    </div>
  );
}

export default App;
