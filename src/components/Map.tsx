/*Since the map was loaded on client side, 
we need to make this component client rendered as well*/
"use client";

//Map component Component from library
import { GoogleMap, MarkerF } from "@react-google-maps/api";

//Map's styling
const defaultMapContainerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "15px 0px 0px 15px",
};

//K2's coordinates
const defaultMapCenter = {
  lat: 35.8799866,
  lng: 76.5048004,
};

//Default zoom level, can be adjusted
const defaultMapZoom = 10;

//Map options
const defaultMapOptions = {
  zoomControl: true,
  tilt: 0,
  gestureHandling: "auto",
  mapTypeId: "satellite",
};

const MapComponent = ({
  mapCenter = defaultMapCenter,
  startPoint,
  destPoint,
}) => {
  return (
    <div className="w-full">
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={mapCenter}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
      >
        <MarkerF position={startPoint} />
        <MarkerF position={destPoint} />
      </GoogleMap>
    </div>
  );
};

export { MapComponent };
