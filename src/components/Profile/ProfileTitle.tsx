import styled from "@emotion/styled";

type ProfileTitleProps = {
  children?: React.ReactNode;
};

const Title = styled.h1`
  font-family: "Montserrat Alternates";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 17px;
  letter-spacing: 0.04em;
  margin-bottom: 8px;
`;

const ProfileTitle = ({ children }: ProfileTitleProps) => {
  return <Title>{children}</Title>;
};

export default ProfileTitle;
