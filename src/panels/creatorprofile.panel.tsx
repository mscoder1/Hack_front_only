import styled from "@emotion/styled";
import { Button, Group, Panel, PanelProps } from "@vkontakte/vkui";
import { useSelector } from "react-redux";
import { RootState } from "../reducers/store";

import cards from "../mockups/cards";
import mints from "../mockups/mints";

import User from "../components/Profile/User";
import ProfileTitle from "../components/Profile/ProfileTitle";
import CurrentMintCard from "../components/CreatorProfile/Cards/CurrentMintCard";
import BalanceCard from "../components/CreatorProfile/Cards/Balance";
import { Icon28AddCircleOutline } from "@vkontakte/icons";
import MintGrid from "../components/CreatorProfile/MintGrid";
import { useCallback, useMemo } from "react";
import { push } from "@itznevikat/router";
import PoapGrid from "../components/CreatorProfile/MintGrid";
import { getImageUrlFromIpfs } from "../utils/ipfs";

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

const BlockGroup = styled(Group)`
  color: var(--content-light);
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 9px;

  @media (max-width: 380px) {
    flex-direction: column;
  }
`;

const AddButton = styled(Button)`
  aspect-ratio: 1/1;
  position: sticky;
  width: 48px;
  min-width: 0;
  min-height: 0;
  bottom: 66px;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: var(--border-radius);
  background-color: #824242 !important;
  color: #2688eb !important;

  & .vkuiButton__content {
    padding: 0 !important;
  }
`;

const CreatorProfilePanel = ({}: PanelProps) => {
  const appData = useSelector((state: RootState) => state.app);
  const poaps = useMemo(() => {
    return appData.poaps.map((poap) => {
      return {
        name: poap.title,
        image: poap.img,
      };
    });
  }, [appData.poaps]);

  const handleClickAddButton = useCallback(() => {
    push("/creator/make");
  }, [push]);

  return (
    <Root>
      <BlockGroup id="user" separator="hide">
        <User
          name={appData.firstName}
          subtitle="Автор"
          avatar={appData.avatar}
        />
      </BlockGroup>
      <BlockGroup id="count" separator="hide">
        <FlexWrapper>
          <CurrentMintCard issued={appData.poaps.length} left={0} />
          <BalanceCard value={cards.balance} />
        </FlexWrapper>
      </BlockGroup>
      <BlockGroup
        id="mints"
        header={<ProfileTitle>{mints.length} Минт</ProfileTitle>}
        separator="hide"
      >
        <PoapGrid poaps={poaps} />
      </BlockGroup>
      <AddButton size="s" onClick={handleClickAddButton}>
        <Icon28AddCircleOutline />
      </AddButton>
    </Root>
  );
};

export default CreatorProfilePanel;
