import { useEffect, useRef } from "react";

const citymap = {
    chicago: {
        center: { lat: 41.878, lng: -87.629 },
        radius: 50,
    },
    newyork: {
        center: { lat: 40.714, lng: -74.005 },
        radius: 50,
    },
    losangeles: {
        center: { lat: 34.052, lng: -118.243 },
        radius: 50,
    },
    vancouver: {
        center: { lat: 49.25, lng: -123.1 },
        radius: 50,
    },
};

export default function Map({ clients }) {
    const ref = useRef();

    useEffect(() => {
        const map = new window.google.maps.Map(ref.current, {
            zoom: 5,
            center: { lat: 37.09, lng: -95.712 },
            mapTypeId: "terrain",
        });

        for (const client of clients) {
            // Add the circle for this city to the map.
            const circle = new google.maps.Circle({
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#FF0000",
                fillOpacity: 0.35,
                map,
                center: { lat: Number(client.Latitude), lng: Number(client.Longitude) },
                radius: 50 * 2000,
            });

            const infoWindow = new google.maps.InfoWindow({
                content: client.Client,
                position: { lat: Number(client.Latitude), lng: Number(client.Longitude) },
            });

            google.maps.event.addListener(circle, "mouseover", function (ev) {
                infoWindow.open(map);
            });

            google.maps.event.addListener(circle, "mouseout", function (ev) {
                infoWindow.close();
            });

            // const marker = new google.maps.Marker({
            //     map: map,
            //     position: new google.maps.LatLng({
            //         lat: Number(client.Latitude),
            //         lng: Number(client.Longitude),
            //     }),
            //     title: "Some location",
            // });

            // circle.bindTo("center", marker, "position");
        }
    });

    return <div style={{ height: "100%" }} ref={ref} id="map" />;
}
