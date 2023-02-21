import styled from "@emotion/styled";
import { Icon24MinusOutline, Icon28MinusSquareOutline } from "@vkontakte/icons";
import { RichCell } from "@vkontakte/vkui";

type WhitelistItemProps = {};

const CustomRichCell = styled(RichCell)`
  color: #2688eb;
  padding: 8px 0;

  & .vkuiRichCell__children {
    font-family: "Montserrat Alternates";
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    line-height: 12px;
    letter-spacing: 0.045em;
    color: var(--content-light);
  }

  & .vkuiRichCell__caption {
    font-family: "Montserrat Alternates";
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 12px;
    letter-spacing: 0.045em;
    color: #987979;
    margin-top: 2px;
    margin-bottom: 8px;
  }

  & .vkuiRichCell__before {
    margin-right: 21px;
  }
`;

const Image = styled.img`
  width: 45px;
  height: 45px;
  border-radius: var(--border-radius);
  border: 2px solid #987979;
`;

export const WhitelistItem = ({}: WhitelistItemProps) => {
  return (
    <CustomRichCell
      before={
        <Image src="https://www.figma.com/file/V7fYJZU0Eahvk2gOKVaj7D/image/a133e6bc5201969838c9ce8d87888ce2995c3632?fuid=813117442872183264" />
      }
      after={<Icon28MinusSquareOutline />}
      caption="4 сентября 2023"
    >
      REDBULL FLUGTAG
    </CustomRichCell>
  );
};
11;
export default WhitelistItem;
