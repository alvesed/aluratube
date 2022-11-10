import { StyledRegisterVideo } from "./sytles";
import React from "react";

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

export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: { titulo: "Frost punk", url: "https://youtube.com"}
    });
    const [formVisivel, setFormVisivel] = React.useState(false);

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