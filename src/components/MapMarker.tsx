type MapMarkerProps = {
  lat: number;
  lng: number;
  text: string;
};

const MapMarker = ({ lat, lng, text }: MapMarkerProps) => {
  return (
    <>
      <svg
        width="45"
        height="50"
        viewBox="0 0 45 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 13.0435C0 5.83978 5.83976 0 13.0435 0H31.884C39.0878 0 44.9275 5.83976 44.9275 13.0435V33.6956C44.9275 39.8988 39.8988 44.9275 33.6957 44.9275V44.9275V44.9275C30.6954 44.9275 27.8965 46.2678 25.6001 48.1985C24.4332 49.1795 23.2287 50 22.4638 50C21.7386 50 19.9249 48.73 18.2935 47.461C16.2655 45.8834 13.8012 44.9275 11.2319 44.9275V44.9275V44.9275C5.02869 44.9275 0 39.8989 0 33.6957V13.0435Z"
          fill="url(#pattern0)"
        />
        <defs>
          <pattern
            id="pattern0"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          ></pattern>
        </defs>
      </svg>
    </>
  );
};
