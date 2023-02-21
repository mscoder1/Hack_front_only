import { Avatar, AvatarProps } from "@vkontakte/vkui";
import styled from "@emotion/styled";

const Root = styled.div`
  width: 78px;
  height: 78px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AvatarBackground = styled.div`
  width: 78px;
  height: 78px;

  position: absolute;
  background: linear-gradient(260.12deg, #63b4e1 37.48%, #182ffc 77.41%);
  clip-path: url(#AvatarHeptagonSvgClip);
  -webkit-clip-path: url(#AvatarHeptagonSvgClip);
`;

const StyledAvatar = styled(Avatar)`
  clip-path: url(#AvatarHeptagonSvgClip);
  -webkit-clip-path: url(#AvatarHeptagonSvgClip);
`;

const NFTAvatar = ({ src }: AvatarProps) => {
  return (
    <Root>
      <AvatarBackground />
      <StyledAvatar size={72} src={src} />
    </Root>
  );
};

export default NFTAvatar;
