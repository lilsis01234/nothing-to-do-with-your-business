import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../NavBar/NavBarAdmin'
import SideBar from '../../SideBarAdmin/SideBar'
import axios from 'axios'
import '../../../Other_component/Page.css'
import './AjoutCollaborateur.css'
import { Avatar, Input, Select, Option} from '@material-tailwind/react'

const AjoutCollaborateur = () => {
  

    const Site = [
        { id : 1, nom:'Fivoarana'},
        { id : 2, nom:'Ivohasina'},
        { id: 3, nom:'Soazaraina'}
    ]
    

    const navigate = useNavigate();
    const [nom, setNom] = useState('');
    const [photo, setPhoto] = useState(null);
    const [prenom, setPrenom] = useState('');
    const [lot, setLot] = useState('');
    const [quartier, setQuartier] = useState('');
    const [ville, setVille] = useState('');
    const [telephone, setTelephone] = useState('');
    const [matricule, setMatricule] = useState('');
    const [dateNaissance, setdateNaissance] = useState('');
    const [dateEmbauche, setdateEmbauche] = useState('');
    const [site, setSite] = useState('');
    const [poste, setPoste] = useState('');
    const [sexe, setSexe] = useState('');
    const [email, setEmail] = useState('');

    const Sexe = [
        { id: 1, nom: 'masculin' },
        { id: 2, nom: 'feminin' }
    ]

    //Récupération de la liste des postes
    const [listePoste, setListePoste] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/api/poste/all_postes')
            .then((res) => {
                setListePoste(res.data)
            })
            .catch(err => console.log(err));
    }
    )

    //pour afficher l'image à la saisi des formulaire
    const [selecteImage, setSelecteImage] = useState(null)

    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];
        setPhoto(selectedFile);
        setSelecteImage(selectedFile);
        
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('image', photo);
        formData.append('nom', nom);
        formData.append('lot', lot);
        formData.append('quartier', quartier);
        formData.append('ville', ville);
        formData.append('dateEmbauche', dateEmbauche);
        formData.append('site', site);
        formData.append('dateNaissance', dateNaissance);
        formData.append('poste', poste);
        formData.append('sexe', sexe);
        formData.append('prenom', prenom);
        formData.append('telephone', telephone);
        formData.append('matricule', matricule);
        formData.append('email', email);

        axios.post('http://192.168.16.244:4000/api/collaborateur/add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(res => {
                console.log(res);
                navigate('/admin/collaborateur/liste');
            }).catch(err => console.log(err));

    }

    return (
        <div className="page">
            <Navbar />
            <div className="content">
                <SideBar />
                <div className="main-content">
                    <div className="collaborateurAddContent bg-black w-full rounded-lg">
                        <h1 className="font-bold text-2xl pt-5 text-white">Ajouter un collaborateur</h1>
                        <form onSubmit={handleSubmit} className="collaborateurAddContent_Form">
                            <div className="collaborateurAddContent_FormContent">
                                <div className="collaborateurAddContent_Form_Photo">
                                    <label >Photo:</label><br></br>
                                        {selecteImage && (
                                            <Avatar src={URL.createObjectURL(selecteImage)} className="w-32 h-32 rounded-full"/>
                                        )}
                                        <input type='file' onChange={handleImageChange}  accept="image/*" ></input>
                                </div>
                                <div className="grid grid-cols-12 p-5">
                                    <div className="col-span-4 m-2"> <Input type="text" label="Matricule" onChange={(e) => { setMatricule(e.target.value) }}  size="lg"/></div>
                                    <div className="col-span-4 m-2"> <Input type="text" label="Nom" onChange={(e) => { setNom(e.target.value) }} size="lg"/></div>
                                    <div className="col-span-4 m-2"> <Input type="text" label="Prénom" onChange={(e) => { setPrenom(e.target.value) }} size="lg"/></div>
                                </div>
                                <div className="grid grid-cols-12 p-5">
                                    <div className="col-span-4 m-2"> <Input type="date" label="Date de Naissance" onChange={(e) => { setdateNaissance(e.target.value) }}  size="lg"/></div>
                                    <div className="col-span-4 m-2">
                                        <Select label="Sexe"  onChange={(e) => setSexe(e)}>
                                            {Sexe.map((sexeitem) => (
                                                <Option key={sexeitem.id} value={sexeitem.nom}>
                                                    {sexeitem.nom}
                                                </Option>
                                            ))}
                                        </Select>
                                    </div>
                                </div> 
                                <div className="grid grid-cols-12 p-5">
                                    <div className="col-span-4 m-2"> <Input type="text" label="Adresse" onChange={(e) => { setLot(e.target.value) }}  size="lg"/></div>
                                    <div className="col-span-4 m-2"> <Input type="text" label="Quartier" onChange={(e) => { setQuartier(e.target.value) }} size="lg"/></div>
                                    <div className="col-span-4 m-2"> <Input type="text" label="Ville" onChange={(e) => { setVille(e.target.value) }} size="lg"/></div>
                                </div>    
                                <div className="grid grid-cols-12 p-5">
                                    <div className="col-span-4 m-2"> <Input type="text" label="Téléphone" onChange={(e) => { setTelephone(e.target.value) }}  size="lg"/></div>
                                    <div className="col-span-4 m-2"> <Input type="text" label="Email" onChange={(e) => { setEmail(e.target.value) }} size="lg"/></div>
                                </div> 
                                <div className="grid grid-cols-12 p-5">
                                    <div className="col-span-4 m-2"> <Input type="date" label="Date d'embauche" onChange={(e) => { setdateEmbauche(e.target.value)}}  size="lg"/></div>
                                    <div className="col-span-4 m-2">
                                    <Select label="Poste"  onChange={(e) => setPoste(e)}>
                                            {listePoste.map((poste) => (
                                                <Option key={poste.id} value={poste.id}>
                                                  {poste.titrePoste}
                                                </Option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className="col-span-4 m-2">
                                    <Select label="Site"  onChange={(e) => setSite(e)}>
                                            {Site.map((site) => (
                                                <Option key={site.id} value={site.nom}>
                                                  {site.nom}
                                                </Option>
                                            ))}
                                        </Select>
                                    </div>
                                </div> 
                                <button type='submit' className="collaborateurAddContent_Form_Button">Ajouter</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AjoutCollaborateur
