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

export default function Map() {
    const ref = useRef();

    useEffect(() => {
        const map = new window.google.maps.Map(ref.current, {
            zoom: 5,
            center: { lat: 37.09, lng: -95.712 },
            mapTypeId: "terrain",
        });

        for (const city in citymap) {
            // Add the circle for this city to the map.
            const cityCircle = new google.maps.Circle({
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#FF0000",
                fillOpacity: 0.35,
                map,
                center: citymap[city].center,
                radius: citymap[city].radius * 2000,
            });
        }
    });

    return <div style={{ height: "100%" }} ref={ref} id="map" />;
}
