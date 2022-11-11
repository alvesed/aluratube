import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import { StyledFavorites } from "../src/components/Favorites";
import React from "react";
import { videoService } from "../src/services/videoService";

function HomePage() {
  const service = videoService();
  //console.log(config.playlists);
  const [valorDoFiltro, setValorDoFiltro] = React.useState("");

  //const playlists = {
  //  "jogos": [],
  //};
  const [playlists, setPlaylists] = React.useState({});

  React.useEffect(() => {
    console.log("use effect");
    service
      .getAllVideos()
      .then((dados) => {
        console.log(dados);
        //Forma imutavel
        const novasPlaylists = {...playlists};
        dados.data.forEach((video) => {
            if (!novasPlaylists[video.playlist]) novasPlaylists[video.playlist] = [];
            novasPlaylists[video.playlist] = [
                video,
                ...novasPlaylists[video.playlist],
              ];
        });
        setPlaylists(novasPlaylists);
        console.log(novasPlaylists);
    });
  }, []);


  return (

    <>
      <CSSReset />
      <div style={{
        display: "flex",
        flexDirection: "column",
        flex: 1
        // backgroundColor: "red",
      }}>
        <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
        <Header />
        <Timeline searchValue={valorDoFiltro} playlists={playlists}> //config.playlists
          Conteúdo
        </Timeline>
        <Favoritos favorites={config.favorites}>
          Conteúdo
        </Favoritos>
      </div>
    </>
  );
}

export default HomePage



const StyledHeader = styled.div`
  background-color: ${({ theme }) => theme.backgroundLevel1};

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user-info {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`;

const StyledBanner = styled.div`
    background-color: blue;
    background-image: url(${({ bg }) => bg});
    /* background-image: url(${config.bg}); */
    height: 230px;
`;

function Header() {
  return (
    <StyledHeader>
      <StyledBanner bg={config.bg} />
      <section className="user-info">
        <img src={`https://github.com/${config.github}.png`} />
        <div>
          <h2>
            {config.name}
          </h2>
          <p>
            {config.job}
          </p>
        </div>
      </section>
    </StyledHeader>
  )
}

function Timeline({searchValue, ...props}) {
  //console.log("Dentro do componente", props.playlists);
  const playlistNames = Object.keys(props.playlists);

  //Statement
  //Retorno por expressao
  return (
    <StyledTimeline>
      {playlistNames.map((playlistName) => {
        const videos = props.playlists[playlistName];
        //console.log(playlistName);
        //console.log(videos);
        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos
                .filter((video) => {
                  const titleNormalized = video.title.toLowerCase();
                  const searchValueNormalized = searchValue.toLowerCase();
                  return titleNormalized.includes(searchValueNormalized)
                })
                .map((video) => {
                  return (
                    <a key={video.url} href={video.url}>
                      <img src={video.thumb} />
                      <span>
                        {video.title}
                      </span>
                    </a>
                  )
              })}
            </div>
          </section>
        )
      })}
    </StyledTimeline>
  )
}

function Favoritos(props) {
  //console.log("CONTEÚDO listFavorites");
  const listFavorites = props.favorites;
  //console.log(listFavorites);

  //console.log("listFavorites map");
  //listFavorites.map((favorite) => {
  //  console.log(favorite);
  //});

  return (
    <StyledFavorites>
        <section>
          <h2>Favoritos</h2>
          <div>
            {listFavorites.map((favorite) => {
                //console.log(favorite.urlfav);
                return (
                  <a key={favorite.urlfav} href={favorite.urlfav}>
                    <img src={favorite.img} />
                  </a>
                )
            })}
          </div>
        </section>
    </StyledFavorites>
  )
}