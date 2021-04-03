import React, { useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { appSettings } from '../../../appSettings'
import { useState } from 'react';

const AnyReactComponent = ({ text }) => <i style={{fontSize: 45, color: "red"}} className="now-ui-icons location_pin"></i>;

export default function Map(props) {

    return (
        <GoogleMapReact
            bootstrapURLKeys={appSettings.googleMapAPIKey}
            defaultCenter={{ lat: parseFloat(props.lat.$numberDecimal), lng: parseFloat(props.lan.$numberDecimal) }}
            defaultZoom={20}
        >
            <AnyReactComponent
                lat={parseFloat(props.lat.$numberDecimal)}
                lng={parseFloat(props.lan.$numberDecimal)}
                text="My Marker"
            />
        </GoogleMapReact>

    )
}
