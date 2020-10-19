import React, { ChangeEvent, FormEvent, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { useHistory } from "react-router-dom";

import { FiPlus } from "react-icons/fi";

import '../styles/pages/create-orphanage.css';
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

const mapBoxURL = `https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`;

export default function CreateOrphanage() {
    const history = useHistory();
    const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [instructions, setInstructions] = useState('');
    const [opening_hours, setOpeningHours] = useState('');
    const [open_on_weekends, setOpenOnWeekends] = useState(true);
    const [images, setImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    function handleMapClick(event: LeafletMouseEvent) {
        const { lat, lng } = event.latlng;
        setPosition({ latitude: lat, longitude: lng });
    }

    function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) return;

        const selectedImages = Array.from(event.target.files);
        setImages(selectedImages);

        const selectedImagesPreview = selectedImages.map(image => {
            return URL.createObjectURL(image);
        });

        setPreviewImages(selectedImagesPreview);
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const { latitude, longitude }= position;

        const formData = new FormData();

        formData.append('name', name);
        formData.append('about', about);
        formData.append('latitude', String(latitude));
        formData.append('longitude', String(longitude));
        formData.append('instructions', instructions);
        formData.append('opening_hours', opening_hours);
        formData.append('open_on_weekends', String(open_on_weekends));
        
        images.forEach(image => {
            formData.append('images', image);
        });

        await api.post('/orphanages', formData);

        alert('Cadastro realizado com sucesso!');

        history.push('/app');
    }

    return (
        <div id="page-create-orphanage">
            <Sidebar />
      
        <main>
            <form onSubmit={handleSubmit} className="create-orphanage-form">
                <fieldset>
                    <legend>Dados</legend>

                    <Map 
                        center={[-23.5419952, -46.9109246]}
                        style={{ width: '100%', height: 280 }}
                        zoom={15}
                        onclick={handleMapClick}
                    >
                    <TileLayer url={mapBoxURL} />

                    {position.latitude !== 0 && (
                        <Marker 
                            interactive={false} 
                            icon={mapIcon} 
                            position={[ position.latitude, position.longitude ]} />
                    )}
                    
                    </Map>

                    <div className="input-block">
                        <label htmlFor="name">Nome</label>
                        <input
                            id="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>

                    <div className="input-block">
                        <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
                        <textarea
                            id="name"
                            maxLength={300}
                            value={about}
                            onChange={e => setAbout(e.target.value)}
                        />
                    </div>

                    <div className="input-block">
                        <label htmlFor="images">Fotos</label>

                        <div className="images-container">
                            {previewImages.map(image => {
                                return (<img key={image} src={image} alt={name} />)
                            })}

                            <label htmlFor="image[]" className="new-image">
                                <FiPlus size={24} color="#15b6d6" />
                            </label>
                        </div>
                        <input multiple onChange={handleSelectImages} type="file" id="image[]" />
                    </div>
                </fieldset>

                <fieldset>
                    <legend>Visitação</legend>

                    <div className="input-block">
                        <label htmlFor="instructions">Instruções</label>
                        <textarea
                            id="instructions" 
                            value={instructions} 
                            onChange={e => setInstructions(e.target.value)}
                        />
                    </div>

                    <div className="input-block">
                        <label htmlFor="opening_hours">Horário de funcionamento</label>
                        <input
                            id="opening_hours" 
                            value={opening_hours} 
                            onChange={e => setOpeningHours(e.target.value)}
                        />
                    </div>

                    <div className="input-block">
                        <label htmlFor="open_on_weekends">Atende fim de semana</label>

                        <div className="button-select">
                            <button 
                                type="button" 
                                className={open_on_weekends ? 'active' : ''}
                                onClick={() => setOpenOnWeekends(true)} >
                                Sim
                            </button>

                            <button 
                                type="button"
                                className={!open_on_weekends ? 'active' : ''}
                                onClick={() => setOpenOnWeekends(false)} >
                                Não
                            </button>
                        </div>
                    </div>
                </fieldset>

                <button className="confirm-button" type="submit">
                    Confirmar
                </button>
            </form>
        </main>
    </div>
  );
}