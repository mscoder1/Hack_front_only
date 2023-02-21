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

const Image = styled.img`
  width: auto;
  height: 28px;
`;

type BalanceCardProps = {
  value: number;
};

const BalanceCard = ({ value }: BalanceCardProps) => {
  return (
    <BaseCard
      header="Счёт"
      left={<Title>{value.toFixed(4)}</Title>}
      right={<Image src="/imgs/currency.png" alt="Валюта" />}
    />
  );
};

export default BalanceCard;
