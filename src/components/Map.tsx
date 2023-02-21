import { useRef, useEffect } from "react";
import mmrgl from "mmr-gl";
import styled from "@emotion/styled";
import "mmr-gl/dist/mmr-gl.css";
import { useSelector } from "react-redux";
import { RootState } from "../reducers/store";

const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

function Map() {
  const appData = useSelector((state: RootState) => state.app);
  const mapRef = useRef<mmrgl.Map>();

  useEffect(() => {
    mapRef.current = new mmrgl.Map({
      container: "map",
      zoom: 8,
      center: [30.3141, 59.9386],
      style: "mmr://api/styles/dark_style.json",
      accessToken: import.meta.env.VITE_VKCLOUD_TOKEN,
    });

    mapRef.current.addControl(new mmrgl.NavigationControl());
    mapRef.current.addControl(new mmrgl.GeolocateControl());

    return () => {
      if (mapRef.current) mapRef.current.remove();
    };
  }, []);

  // Добавляем маркеры на карту
  useEffect(() => {
    console.log(appData.poaps);

    appData.poaps.forEach((poap) => {
      const coordinates: [number, number] = [
        Number(poap.longitude),
        Number(poap.latitude),
      ];

      const popup = new mmrgl.Popup({ offset: 25 }).setText(`${poap.title}`);

      const marker = new mmrgl.Marker({
        element: document.createElement("div"),
      })
        .setLngLat(coordinates)
        .setPopup(popup)
        .addTo(mapRef.current as mmrgl.Map);

      const element = marker.getElement();
      element.classList.add("poap-marker");
      element.style.backgroundImage = `url(${poap.img})`;
    });
  }, [appData.poaps]);

  return <MapContainer id="map" />;
}

export default Map;
