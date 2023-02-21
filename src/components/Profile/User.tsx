import styled from "@emotion/styled";
import NFTAvatar from "./NFTAvatar";

const Root = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
`;

const UserName = styled.h2`
  font-family: "Ponter";
  font-style: normal;
  font-size: 28px;
  line-height: 32px;
  text-transform: uppercase;
`;

const Subtitle = styled.h3`
  font-family: "Montserrat Alternates";
  font-style: normal;
  font-weight: 600;
  font-size: 11px;
  line-height: 12px;
  letter-spacing: 0.045em;
`;

type UserProps = {
  name: string;
  subtitle: string;
  avatar: string;
};

const User = ({ name, subtitle, avatar }: UserProps) => {
  return (
    <Root>
      <NFTAvatar src={avatar} />
      <UserInfo>
        <UserName>{name}</UserName>
        <Subtitle>{subtitle}</Subtitle>
      </UserInfo>
    </Root>
  );
};

export default User;
