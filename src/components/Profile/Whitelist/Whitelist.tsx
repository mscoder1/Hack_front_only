import styled from "@emotion/styled";
import { Avatar, RichCell, Title } from "@vkontakte/vkui";
import WhitelistItem from "./WhitelistItem";

type TokenProps = {};

export const Whitelist = ({}: TokenProps) => {
  const list = [
    {
      id: 1,
      title: "Title 1",
      description: "Description 1",
      before: <Avatar />,
    },
    {},
    {},
  ];

  return (
    <>
      {list.map((item) => (
        <WhitelistItem key={item.id} />
      ))}
    </>
  );
};
11;
export default Whitelist;
