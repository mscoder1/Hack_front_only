import styled from "@emotion/styled";
import ProfileTitle from "../../Profile/ProfileTitle";

const Root = styled.div`
  width: 100%;
  border-radius: var(--border-radius);
  padding: 12px;
  background: #542c2c;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 12px;
`;

const Side = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

type CountCardProps = {
  header: string;
  left: React.ReactNode;
  right: React.ReactNode;
};

const BaseCard = ({ header, left, right }: CountCardProps) => {
  return (
    <Root>
      <ProfileTitle>{header}</ProfileTitle>
      <Wrapper>
        <Side>{left}</Side>
        <Side>{right}</Side>
      </Wrapper>
    </Root>
  );
};

export default BaseCard;
