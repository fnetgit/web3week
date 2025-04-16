"use client";

import { useState } from "react";
import { addCampaign, getLastCampaigId } from "@/services/Web3Service";

export default function Create() {

    const [message, setMessage] = useState("");
    const [campaign, setCampaign] = useState({
        title: "",
        description: "",
        imageUrl: "",
        videoUrl: ""
    });

    function onInputChange(evt) {
        setCampaign(prevState => ({ ...prevState, [evt.target.id]: evt.target.value }));
    }

    function btnsaveClick() {
        setMessage("Salvando a campanha...aguarde...");
        addCampaign(campaign)
            .then(tx => getLastCampaigId())
            .then(id => setMessage(`Campanha foi salva com o ID: ${id}. Em alguns minutos ela estará pronta para receber doações, use este link para divulgá-la: https://localhost:3000/donate/${id}`))
            .catch(err => {
                console.error(err);
                setMessage(err.message);
            });
    }

    return (
        <>
            <div className="container">
                <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3 mt-5">Donate Crypto</h1>
                <p>Preencha os campos para incluir sua campanha na plataforma.</p>
                <p>Ao término do cadastro, você receberá o link para divulgá-la e receber as doações.</p>
                <hr className="mb-4" />
                <div className="col-6">
                    <div className="form-floating mb-3">
                        <input type="text" id="title" className="form-control" onChange={onInputChange} value={campaign.title || ""} />
                        <label htmlFor="title">Título:</label>
                    </div>
                    <div className="form-floating mb-3">
                        <textarea id="description" className="form-control" onChange={onInputChange} value={campaign.description || ""} />
                        <label htmlFor="description">Descrição:</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" id="imageUrl" className="form-control" onChange={onInputChange} value={campaign.imageUrl || ""} />
                        <label htmlFor="imageUrl">URL da Imagem:</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" id="videoUrl" className="form-control" onChange={onInputChange} value={campaign.videoUrl || ""} />
                        <label htmlFor="videoUrl">URL do Vídeo:</label>
                    </div>
                    <div className="col-12 mb-3">
                        <button type="button" className="btn btn-primary col-12 p-3" onClick={btnsaveClick}>Salvar</button>
                    </div>
                    {
                        message
                            ? <div className="alert alert-warning p-3 col-12 mt-3" role="alert">{message}</div>
                            : null
                    }
                </div>
            </div>
        </>
    );
}