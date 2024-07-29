import { useState } from "react";

import axios from "axios";

import { colors } from "./assets/colors";
import { Footer } from "./components/Footer";
import { Spinner } from "./components/Spinner";
import { SearchButton } from "./components/SearchButton";
import { InputComponent } from "./components/InputComponent";

import "./styles/global.css";

export default function App() {
  const [artist, setArtist] = useState("");
  const [song, setSong] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [loading, setLoading] = useState(false);

  const changeBGColor = () => {
    let index = Math.floor(Math.random() * 10);
    document.body.style.backgroundImage = colors[index];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (artist && song) {
      try {
        changeBGColor();
        setLoading(true);

        const resp = await axios.get(
          `https://api.lyrics.ovh/v1/${artist}/${song}`
        );
        const data = await resp.data;
        setLyrics(data.lyrics);
      } catch (err) {
        console.log(err);
        if (err.response.data.error) {
          setLyrics(err.response.data.error);
        }
      } finally {
        setLoading(false);
      }
    } else {
      setLyrics("Digite nome do artista e música!");
    }
  };

  return (
    <div className="App">
      <h1>Letras de Músicas </h1>

      <form className="nav">
        <InputComponent
          placeholder="Artista"
          onChange={(e) => setArtist(e.target.value)}
        />

        <InputComponent
          placeholder="Música"
          onChange={(e) => setSong(e.target.value)}
        />

        <SearchButton text="Buscar" onClick={handleSubmit} />
      </form>

      <hr />
      <pre>{loading ? <Spinner /> : lyrics}</pre>

      <Footer position={lyrics.length} />
    </div>
  );
}
