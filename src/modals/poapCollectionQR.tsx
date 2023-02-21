import {
  Button,
  Link,
  ModalCard,
  ModalCardProps,
  Title,
} from "@vkontakte/vkui";
import { useMeta } from "@itznevikat/router";
import { useMemo } from "react";
import qr from "@vkontakte/vk-qr";
import styled from "@emotion/styled";

const TitleCenter = styled(Title)`
  text-align: center;
`;

const QR = styled.img`
  width: 60%;
  height: 60%;
  align-self: center;
  margin: 24px 0;
`;

const CenterLink = styled(Link)`
  text-align: center;
`;

const CustomButton = styled(Button)`
  margin-top: 20px;
`;

const PoapCollectionQRModal = ({}: ModalCardProps) => {
  const { poapCollection: link } = useMeta();

  const generatedQR = useMemo(() => {
    if (!link) return "";
    return qr.createQR(link, {});
  }, [link]);

  const handleClick = () => {
    const a = document.createElement("a");
    const fileName = link.split("mint/")[1];
    Object.assign(a, {
      href: `data:image/svg+xml;base64,${btoa(generatedQR)}`,
      target: "_blank",
      download: `${fileName}.svg`,
    });
    a.click();
  };

  return (
    <ModalCard nav="poapCollectionQR">
      <TitleCenter level="2">Ваш QR</TitleCenter>
      <QR src={`data:image/svg+xml;base64,${btoa(generatedQR)}`} />
      <CenterLink href={link} target="_blank" rel="noreferrer">
        Ссылка на POAP
      </CenterLink>
      <CustomButton onClick={handleClick}>Сохранить</CustomButton>
    </ModalCard>
  );
};

export default PoapCollectionQRModal;
