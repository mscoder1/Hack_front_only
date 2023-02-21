import styled from "@emotion/styled";

type TokenProps = {
  src: string;
  description: string;
};

const Root = styled.div`
  width: 82px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ImageWrapper = styled.div`
  width: 82px;
  height: auto;
  aspect-ratio: 9/14;
  border-radius: var(--border-radius);
  padding: 2px;
  background: linear-gradient(260.12deg, #63b4e1 37.48%, #182ffc 77.41%);
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--border-radius);
`;

const Description = styled.p`
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  line-height: 16px;
  font-family: "Montserrat Alternates";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  text-align: center;
`;

export const TokenItem = ({ src, description }: TokenProps) => {
  return (
    <Root>
      <ImageWrapper>
        <Image src={src} />
      </ImageWrapper>
      <Description>{description}</Description>
    </Root>
  );
};
11;
export default TokenItem;
