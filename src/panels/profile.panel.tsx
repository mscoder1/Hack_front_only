import styled from "@emotion/styled";
import { Div, Group, Panel, PanelProps } from "@vkontakte/vkui";
import { useMemo } from "react";
import { useSelector } from "react-redux";

import tokens from "../mockups/tokens";
import { RootState } from "../reducers/store";
import CityTop from "../components/Profile/CityTop";
import ProfileTitle from "../components/Profile/ProfileTitle";
import TokenList from "../components/Profile/Tokens/TokenList";
import User from "../components/Profile/User";
import Whitelist from "../components/Profile/Whitelist/Whitelist";
import { Web3Button } from "@web3modal/react";

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

const ProfilePanel = ({}: PanelProps) => {
  const appData = useSelector((state: RootState) => state.app);

  // TODO: Переделать на реальные данные
  const friendsPhotos = useMemo(() => {
    return [appData.avatar, appData.avatar, appData.avatar];
  }, [appData.avatar]);

  return (
    <Root>
      <BlockGroup id="user" separator="hide">
        <User
          avatar={appData.avatar}
          name={appData.firstName}
          subtitle="4 POAP"
        />
        <Div>
          <Web3Button />
        </Div>
      </BlockGroup>
      <BlockGroup id="cityTop" separator="hide">
        <CityTop friendsPhotos={[]} />
      </BlockGroup>
      <BlockGroup
        id="tokens"
        header={<ProfileTitle>Токены</ProfileTitle>}
        separator="hide"
      >
        <TokenList tokens={tokens} />
      </BlockGroup>
      <BlockGroup
        id="whitelist"
        header={<ProfileTitle>Вайтлист</ProfileTitle>}
        separator="hide"
      >
        <Whitelist />
      </BlockGroup>
    </Root>
  );
};

export default ProfilePanel;
