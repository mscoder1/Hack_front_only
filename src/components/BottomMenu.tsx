import { Tabbar, TabbarItem } from "@vkontakte/vkui";
import styled from "@emotion/styled";
import { push, useDeserialized } from "@itznevikat/router";
import {
  Icon24Flash,
  Icon24FlashOutline,
  Icon24Home,
  Icon24HomeOutline,
  Icon24User,
  Icon24UserOutline,
} from "@vkontakte/icons";

const TabbarStyled = styled(Tabbar)`
  background: #172119;

  .vkuiTabbar__in {
    overflow: visible;
  }
`;

const TabbarItemStyled = styled(TabbarItem)`
  & svg {
    color: #2688eb;
  }

  cursor: pointer;

  & .vkuiTabbarItem__tappable {
    display: none;
  }
`;

export default function BottomMenu() {
  const { panel } = useDeserialized();

  return (
    <TabbarStyled shadow={false}>
      <TabbarItemStyled
        onClick={() => {
          push("/");
        }}
        selected={panel === "/"}
      >
        {panel === "/" ? <Icon24Home /> : <Icon24HomeOutline />}
      </TabbarItemStyled>
      <TabbarItemStyled
        onClick={() => {
          push("/creator/profile");
        }}
        selected={panel === "/creator/profile"}
      >
        {panel === "/creatorProfile" ? <Icon24Flash /> : <Icon24FlashOutline />}
      </TabbarItemStyled>
      <TabbarItemStyled
        onClick={() => {
          push("/profile");
        }}
        selected={panel === "/profile"}
      >
        {panel === "/profile" ? <Icon24User /> : <Icon24UserOutline />}
      </TabbarItemStyled>
    </TabbarStyled>
  );
}
