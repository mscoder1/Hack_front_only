import styled from "@emotion/styled";
import { UsersStack } from "@vkontakte/vkui";

const Root = styled.div`
  width: 100%;
  padding: 10px 13px;
  position: relative;
  color: var(--content-dark);
  background: linear-gradient(
      107.46deg,
      rgba(5, 78, 165, 0.81) 36.57%,
      rgba(166, 200, 240, 0.432) 78.67%,
      rgba(255, 255, 255, 0) 87.23%
    ),
    url(https://s3-alpha-sig.figma.com/img/eae7/1f03/12c5d29b5201e9487bd6854436de4c73?Expires=1677456000&Signature=LqyJYZhKXHMlXzPi3cMYQShLLjO9YZKWSsrxVpRAMXCW2HLqIgSk1MRUOMlG8pEF3L57tyl-inheR9teVRBFAXae2lRetGSGK9BQEW2tMo-0LLgy8vut-~c6raz9X~b653tAOMLFKbft8VXYs8ZYgPlCJfcLUpvbQf9qAF-Tx8z2LxuZCr0vwewuG~5aikCJ~0YrvLI0GiuAZJIaL3TVutha6p1NVnKRdnJhPk0Win5OskOVojd~pL7OaeZWd~jEAN-PaLUuZyW-Yay-wnmBMNniJaSYaJGS01Wr7NkXo8Cr6Jqcfnb4IrCURFjFs1xPGvOPhR4RBZ78pCD7GlbTlQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4);
  background-size: cover;
  background-position: center;
  border-radius: var(--border-radius);
`;

const Title = styled.h2`
  font-family: "Montserrat Alternates";
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 13px;
`;

const City = styled.h1`
  font-family: "Montserrat Alternates";
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 28px;
`;

const PlacesCounter = styled.span`
  background: var(--content-light);
  border-radius: 8px;

  position: absolute;
  top: 10px;
  right: 13px;
  padding: 2px 8px;

  font-family: "Montserrat Alternates";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.045em;
`;

const FriendsView = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
`;

const FriendsCaption = styled.span`
  font-family: "Montserrat Alternates";
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
  letter-spacing: 0.045em;
`;

type CityTopProps = {
  friendsPhotos: string[];
};

const CityTop = ({ friendsPhotos }: CityTopProps) => {
  return (
    <Root>
      <PlacesCounter>15 мест</PlacesCounter>
      <Title>Топ городов</Title>
      <City>Санкт-Петербург</City>
      <FriendsView>
        <UsersStack size="s" photos={friendsPhotos} />
        <FriendsCaption>
          {friendsPhotos.length} друзей были в тех же местах
        </FriendsCaption>
      </FriendsView>
    </Root>
  );
};

export default CityTop;
