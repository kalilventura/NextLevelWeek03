import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight }  from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import mapMarkerImg from '../images/map-marker.svg';

import { Container, ContentWrapper } from '../styles/pages/orphanages-map';
import Sidebar from '../components/Sidebar';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

const mapBoxURL = `https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`;
interface Orphanage {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

const OrphanagesMap = () => {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useEffect(() => {
        api.get('/orphanages').then(response => {
            setOrphanages(response.data);
        })
    }, []);

    return (
        <>
            <Sidebar />
        
            <Container>
                <ContentWrapper>
                    <header>
                        <img src={mapMarkerImg} alt="Happy" />

                        <h2>Escola um orfanato no mapa</h2>
                        <p>Muitas crianças estão esperando a sua visita :)</p>
                    </header>

                    <footer>
                        <strong>Belo Horizonte</strong>
                        <span>Minas Gerais</span>
                    </footer>
                </ContentWrapper>

                <Map 
                    center={[-23.5419952, -46.9109246]}
                    zoom={14}
                    style={{ width: '100%', height: '100%' }} >
                    <TileLayer url={mapBoxURL} />

                    {
                    orphanages.map(orphanage => {
                        return (
                            <Marker
                                key={orphanage.id} 
                                icon={mapIcon}
                                position={[orphanage.latitude, orphanage.longitude]} >
                                <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                    {orphanage.name}
                                    <Link to={`/orphanages/${orphanage.id}`}>
                                        <FiArrowRight size={20} color="#FFF" />
                                    </Link>
                                </Popup>
                            </Marker>
                        )
                    })
                    }
                </Map>

                <Link to="/orphanages/create" className="create-orphanages">
                    <FiPlus size={32} color="#FFF" />
                </Link>
            </Container>
        </>
    );
}

export default OrphanagesMap;