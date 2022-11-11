import { StyledRegisterVideo } from "./sytles";
import React from "react";
import { createClient } from "@supabase/supabase-js";

//Custom Hook
function useForm(propsDoForm) {
  const [values, setValues] = React.useState(propsDoForm.initialValues);

  return {
      values,
      handleChange: (evento) => {
        console.log(evento.target);
        const value=evento.target.value;
        const name=evento.target.name;
        setValues({
          ...values,
          [name]: value,
        });
      },
      clearForm() {
        setValues({});
      }
  };
}

// Create a single supabase client for interacting with your database
const PROJECT_URL = "https://srcfbrparudyyyoadtvt.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyY2ZicnBhcnVkeXl5b2FkdHZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxNzA0MjQsImV4cCI6MTk4Mzc0NjQyNH0.dGdz-XMHgT9AIBa_GF51hNawXuCrM4FuTApCQd4x-lI";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);


// get youtube thumbnail from video url
function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

// get youtube video id
function getVideoId(url) {
    const videoId = url.split("v=")[1];
    const ampersandPosition = videoId.indexOf("&");
    if (ampersandPosition !== -1) {
      return videoId.substring(0, ampersandPosition);
    }
}

export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: { titulo: "Frost punk", url: "https://www.youtube.com/watch?v=QsqatJxAUtk"}
    });
    const [formVisivel, setFormVisivel] = React.useState(false);

    //console.log(supabase);
    return (
          <StyledRegisterVideo>
              <button className="add-video" onClick={() => setFormVisivel(true)}>
                  +
              </button>
              {/** curto circuito: true && */}
              {/** ternario: true ? "Componente visivel" : "Componente nao visivel" */}

              {formVisivel
                ? (
                  <form onSubmit={(evento) => {
                      evento.preventDefault();
                      console.log(formCadastro.values);

                      //contrato entre o front e o backend
                      supabase.from("video").insert({
                        title: formCadastro.values.titulo,
                        url: formCadastro.values.url,
                        thumb: getThumbnail(formCadastro.values.url),
                        playlist: "jogos"
                      })
                      .then((retorno) => {
                        console.log(retorno);
                      })
                      .catch((err) => {
                        console.log(err);
                      });

                      setFormVisivel(false);
                      formCadastro.clearForm();
                  }}>
                      <div>
                        <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                            X
                        </button>
                        <input
                            placeholder="Titulo do video"
                            name="titulo"
                            value={formCadastro.values.titulo}
                            onChange={formCadastro.handleChange}
                        />
                        <input
                            placeholder="URL"
                            name="url"
                            value={formCadastro.values.url}
                            onChange={formCadastro.handleChange}
                        />
                        <button type="submit">
                            Cadastrar
                        </button>
                      </div>
                  </form>
                )
                : false}

          </StyledRegisterVideo>
        )
}