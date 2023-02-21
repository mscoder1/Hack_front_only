import styled from "@emotion/styled";
import { HorizontalScroll } from "@vkontakte/vkui";
import TokenItem from "./TokenItem";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const TokenList = ({ tokens }: any) => {
  return (
    <HorizontalScroll>
      <Wrapper>
        {tokens.map((token: any) => {
          return (
            <TokenItem
              key={token.id}
              src={token.src}
              description={token.description}
            />
          );
        })}
      </Wrapper>
    </HorizontalScroll>
  );
};

export default TokenList;
