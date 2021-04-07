import React, { useMemo, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { appSettings } from "../../../appSettings";

const createControlledPromise = () => {
  let resolver;
  let rejector;
  const promise = new Promise((resolve, reject) => {
    resolver = resolve;
    rejector = reject;
  });
  return { promise, resolver, rejector };
};

const useMarker = ({ lat, lng }) => {
  const { promise: apiPromise, resolver: handleGoogleApiLoaded } = useMemo(
    createControlledPromise,
    []
  ).current;

  useEffect(() => {
    let marker;
    apiPromise.then((api) => {
      const { map, maps } = api;
      marker = new maps.Marker({ position: { lat, lng }, map });
    });
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [lat, lng]);
  return { handleGoogleApiLoaded };
};

const Marker = ({ location: { locationName, lat, lng } }) => {
  const { handleGoogleApiLoaded } = useMarker({ lat, lng });
  return (
    <section>
      <h1>{locationName}</h1>
      <p>
        <GoogleMapReact
          bootstrapURLKeys={appSettings.googleMapAPIKey}
          center={{ lat, lng }}
          defaultZoom={11}
          onGoogleApiLoaded={handleGoogleApiLoaded}
        />
      </p>
    </section>
  );
};

export default Marker;
