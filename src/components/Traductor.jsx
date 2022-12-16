import React, { useEffect, useState } from "react";
import { Button, Form, ToggleButton } from "react-bootstrap";
import "../App.css";
import axios from "axios";
import { Lector } from "./Lector";
import Swal from "sweetalert2";
// const API_KEY = "8d05dccac7mshc302b4bb1ebe8edp106464jsn35a65554485a"
const API_KEY = "dfb1bc3d4dmsh07415eecc2d2a6fp144ea4jsnb81177a3a1cd"

export const Traductor = () => {
  const [textoEntrante, setTextoEntrante] = useState("");
  const [claveIdiomaDetectado, setClaveIdiomaDetectado] = useState("");
  const [nombreIdiomaDetectado, setNombreIdiomaDetectado] = useState("");
  const [listaIdiomas, setListaIdiomas] = useState([]);
  const [claveIdiomaSeleccionado, setClaveIdiomaSeleccionado] = useState("");
  const [textoResultante, setTextoResultante] = useState("");
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hayTraduccion, setHayTraduccion] = useState(false);
  const handleText = (e) => {
    setTextoEntrante(e.target.value);
    if (!e.target.value) {
      setNombreIdiomaDetectado(false);
      setClaveIdiomaDetectado();
    }
  };

  const todosIdiomas = [
    {
      code: "en",
      name: "English",
    },
    {
      code: "ar",
      name: "Arabic",
    },
    {
      code: "az",
      name: "Azerbaijani",
    },
    {
      code: "zh",
      name: "Chinese",
    },
    {
      code: "cs",
      name: "Czech",
    },
    {
      code: "da",
      name: "Danish",
    },
    {
      code: "nl",
      name: "Dutch",
    },
    {
      code: "eo",
      name: "Esperanto",
    },
    {
      code: "fi",
      name: "Finnish",
    },
    {
      code: "fr",
      name: "French",
    },
    {
      code: "de",
      name: "German",
    },
    {
      code: "el",
      name: "Greek",
    },
    {
      code: "he",
      name: "Hebrew",
    },
    {
      code: "hi",
      name: "Hindi",
    },
    {
      code: "hu",
      name: "Hungarian",
    },
    {
      code: "id",
      name: "Indonesian",
    },
    {
      code: "ga",
      name: "Irish",
    },
    {
      code: "it",
      name: "Italian",
    },
    {
      code: "ja",
      name: "Japanese",
    },
    {
      code: "ko",
      name: "Korean",
    },
    {
      code: "fa",
      name: "Persian",
    },
    {
      code: "pl",
      name: "Polish",
    },
    {
      code: "pt",
      name: "Portuguese",
    },
    {
      code: "ru",
      name: "Russian",
    },
    {
      code: "sk",
      name: "Slovak",
    },
    {
      code: "es",
      name: "Spanish",
    },
    {
      code: "sv",
      name: "Swedish",
    },
    {
      code: "tr",
      name: "Turkish",
    },
    {
      code: "uk",
      name: "Ukranian",
    },
  ];

  const handleSelectIdiomaOrigen = (e) => {
    setClaveIdiomaDetectado(e.target.value);
    setChecked(false);
  };

  const obtenerFuenteDelIdioma = async () => {
    // const rta = await axios.post(`https://libretranslate.com/detect`, {
    //   q: textoEntrante,
    // });
  
    const idiomaDetectado =  todosIdiomas.find((idioma) => idioma.code == claveIdiomaDetectado);
    console.log(claveIdiomaDetectado)
    // setClaveIdiomaDetectado(response.data.detections[0]["0"].language);
    
    setNombreIdiomaDetectado("");
   
      // console.log(idiomaDetectado)
 
  };

  useEffect(() => {
    axios.get("https://libretranslate.com/languages").then((rta) => {
      setListaIdiomas(rta.data);
      
    });
    // const options = {
    //   method: 'GET',
    //   headers: {
    //     'Accept-Encoding': 'application/gzip',
    //     'X-RapidAPI-Key': '8d05dccac7mshc302b4bb1ebe8edp106464jsn35a65554485a',
    //     'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
    //   }
    // };
    
    // fetch('https://google-translate1.p.rapidapi.com/language/translate/v2/languages', options)
    //   .then(response => response.json())
    //   .then(response => console.log(response))
    //   .catch(err => console.error(err));



    if (checked) {
      obtenerFuenteDelIdioma();
    } else {
      // setClaveIdiomaDetectado("");
      // setNombreIdiomaDetectado("");
    }
  }, [textoEntrante, checked]);

  const selectIdioma = (e) => {
    setClaveIdiomaSeleccionado(e.target.value);
  };

  const traducirTexto = async () => {
    // obtenerFuenteDelIdioma();

    if (!claveIdiomaDetectado && !checked) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes seleccionar el idioma de origen!",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonText: "Auto detectalo",
      }).then((result) => {
        if (result.isConfirmed) {
          // Swal.fire("Deleted!", "Your file has been deleted.", "success");
          setChecked(true);
        }
      });
    }
    if (!claveIdiomaSeleccionado) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes seleccionar el idioma de destino!",
      });
      // return alert("Selecciona un idioma de destino");
    }
    if (!textoEntrante) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No hay texto para traducir",
      });
    }

    setLoading(true);
    let data = {
      q: textoEntrante,
      source: claveIdiomaDetectado,
      target: claveIdiomaSeleccionado,
    };

    // axios
    //   .post(`https://libretranslate.com/translate`, data)
    //   .then((respuesta) => {
    //     setTextoResultante(respuesta.data.translatedText);
    //     setLoading(false);
    //     setHayTraduccion(true);
    //   });
   



    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '8d05dccac7mshc302b4bb1ebe8edp106464jsn35a65554485a',
        'X-RapidAPI-Host': 'translated-mymemory---translation-memory.p.rapidapi.com'
      }
    };
    
    fetch(`https://translated-mymemory---translation-memory.p.rapidapi.com/get?langpair=${claveIdiomaDetectado}|${claveIdiomaSeleccionado}&q=${textoEntrante}&mt=1&onlyprivate=0&de=a%40b.c`, options)
      .then(response => response.json())
      .then(response => {console.log(response);setTextoResultante(response.responseData.translatedText);setLoading(false);setHayTraduccion(true)})
      .catch(err => console.error(err));
    console.log("si si")
  };

  return (
    <div className="App">
      <div className="app-header">
        <h2 className="header">Traductor de texto</h2>
        <p>Nota: Ante la dificultad de encontrar alguna API gratuita para traducir y luego de intetar usar la API de google y libretranslate.com, he encontrado una que cumple bastante bien mis propósitos academicos, pero  he tenido que deshabilitar el botón de "Detectar automaticamente el idioma a traducir" ya que la API en uso no contiene dicha función. </p>
      </div>
      <div className="app-body">
        <Form.Group>
          <Form.Select
            onChange={handleSelectIdiomaOrigen}
            className="select-idioma"
          >
            <option value={false}>
              Selecciona el idioma de origen a traducir
            </option>
            {listaIdiomas.map((idioma, indice) => {
              return (
                <option key={indice} value={idioma.code}>
                  {idioma.name}
                </option>
              );
            })}
          </Form.Select>

          <ToggleButton
          disabled
            className="mb-2"
            id="toggle-check"
            type="checkbox"
            variant="outline-primary"
            checked={checked}
            value="1"
            onChange={(e) => {
              setChecked(e.currentTarget.checked);
              setClaveIdiomaDetectado(false);
              if (!checked) {
                setNombreIdiomaDetectado("");
              }
              console.log("hola")
            }}
          >
            Detectar idioma
          </ToggleButton>
          {checked && (
            <p className="checked">
              {nombreIdiomaDetectado?.length > 0
                ? nombreIdiomaDetectado
                : "Esperando..."}
            </p>
          )}
          {/* <Form.Label>Ingresa el texto a traducir</Form.Label> */}
          <Form.Control
            onChange={handleText}
            as="textarea"
            rows={3}
            placeholder="Ingresa el texto a traducir"
          />
          <Form.Select onChange={selectIdioma} className="select-idioma">
            <option>Selecciona un idioma a traducir</option>
            {listaIdiomas.map((idioma, indice) => {
              return (
                <option key={indice} value={idioma.code}>
                  {idioma.name}
                </option>
              );
            })}
          </Form.Select>

          <Form.Control
            as="textarea"
            defaultValue={textoResultante}
            placeholder="Traducción"
          />
          <Button className="m-1" onClick={traducirTexto} variant="primary">
            Traducir
          </Button>
          {hayTraduccion && (
            <Lector idioma={claveIdiomaSeleccionado} texto={textoResultante} />
          )}
          {loading && <p>Traduciendo...</p>}
        </Form.Group>
      </div>
    </div>
  );
};
