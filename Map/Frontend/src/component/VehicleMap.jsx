import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const pathCoordinates = [
    { lat: 37.77, lng: -122.447 },
    { lat: 37.768, lng: -122.511 },
    { lat: 37.759, lng: -122.446 },
    { lat: 37.746, lng: -122.449 }
];

const VehicleMap = () => {
    const [currentPos, setCurrentPos] = useState(pathCoordinates[0]);
    const [path, setPath] = useState(pathCoordinates);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(1);
    const [startTime, setStartTime] = useState(null);

    useEffect(() => {
        if (endIndex < pathCoordinates.length) {
            const duration = 8000;
            const interval = 50;
            let animationFrameId;

            const start = pathCoordinates[startIndex];
            const end = pathCoordinates[endIndex];
            const totalDistance = Math.sqrt(
                Math.pow(end.lat - start.lat, 2) + Math.pow(end.lng - start.lng, 2)
            );
            const speed = totalDistance / duration;

            const animate = (timestamp) => {
                if (!startTime) setStartTime(timestamp);
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1);

                const distanceTravelled = speed * elapsed;
                const travelRatio = distanceTravelled / totalDistance;

                const lat = start.lat + travelRatio * (end.lat - start.lat);
                const lng = start.lng + travelRatio * (end.lng - start.lng);

                setCurrentPos({ lat, lng });

                if (travelRatio < 1) {
                    animationFrameId = requestAnimationFrame(animate);
                } else {
                    setStartIndex(endIndex);
                    setEndIndex(endIndex + 1);
                    setStartTime(null);
                }
            };

            animationFrameId = requestAnimationFrame(animate);

            return () => cancelAnimationFrame(animationFrameId);
        }
    }, [endIndex, startIndex, pathCoordinates, startTime]);

    return (
        <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
            <MapContainer center={currentPos} zoom={14} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker
                    position={currentPos}
                    icon={L.icon({
                        iconUrl: 'https://avatars.mds.yandex.net/i?id=f8f98351e68832117c81e62e4d61da440ace3bfa-7544273-images-thumbs&n=13',
                        iconSize: [50, 50],
                        iconAnchor: [25, 50],
                    })}
                />
                <Polyline
                    positions={path}
                    color="red"
                    weight={4}
                    opacity={0.7}
                    lineCap="round"
                />
            </MapContainer>
        </div>
    );
};

export default VehicleMap;
