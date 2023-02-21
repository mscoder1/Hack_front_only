import styled from "@emotion/styled";
import { Panel, PanelProps } from "@vkontakte/vkui";
import Map from "../components/Map";

const Root = styled(Panel)``;

const MapPanel = ({}: PanelProps) => {
  return (
    <Root>
      <Map />
    </Root>
  );
};

export default MapPanel;
