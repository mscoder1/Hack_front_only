import styled from "@emotion/styled";
import BaseCard from "./BaseCard";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Subtitle = styled.h3`
  font-family: "Montserrat Alternates";
  font-style: normal;
  font-weight: 700;
  font-size: 9px;
  letter-spacing: 0.04em;
`;

const Title = styled.h3`
  font-family: "Ponter";
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 28px;
  letter-spacing: 0.04em;
`;

type CurrentMintCardProps = {
  issued: number;
  left: number;
};

const CurrentMintCard = ({ issued, left }: CurrentMintCardProps) => {
  return (
    <BaseCard
      header="Текущий минт"
      left={
        <Wrapper>
          <Subtitle>Выпущенно</Subtitle>
          <Title>{issued}</Title>
        </Wrapper>
      }
      right={
        <Wrapper>
          <Subtitle>Осталось</Subtitle>
          <Title>{left}</Title>
        </Wrapper>
      }
    />
  );
};

export default CurrentMintCard;
