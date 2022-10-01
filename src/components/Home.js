import styled from "styled-components";
import Diseney from "./Diseney";
import ImgSlider from "./ImgSlider";
import Recommends from "./Recommends";
import Series from "./Series";
import Viewer from "./Viewer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import db from "../firebase";
import { setMovies } from "../features/movie/movieSlice";
import { selectUserName } from "../features/userSlice";
import Trending from "./Trending";



const Home = (props) => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  let recommends = [];
  let newDisneys = [];
  let originals = [];
  let trending = [];

  useEffect(() => {
    db.collection("movies").onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        console.log(doc.data().type);
        switch (doc.data().type) {
          case "recommend":
            recommends = [...recommends, { id: doc.id, ...doc.data() }];
            break;
          case "new":
            newDisneys = [...newDisneys, { id: doc.id, ...doc.data() }];
            break;
          case "original":
            originals = [...originals, { id: doc.id, ...doc.data() }];
            break;
          case "trending":
            trending = [...trending, { id: doc.id, ...doc.data() }];
            break;
        }
        console.log(newDisneys);
      });

      dispatch(
        setMovies({
          recommend: recommends.slice(0, 4),
          newDisney: newDisneys.slice(0, 4),
          original: originals.slice(0, 4),
          trending: trending.slice(0, 4),
        })
      );
    });
  }, [userName]);

  return (
      <Container>
        <ImgSlider />
        <Viewer />
        <Recommends />
        <Series />
        <Diseney />
        <Trending />
      </Container>
    );}

const Container = styled.main`
  position: relative;
  top: 72px;
  display: block;
  min-height: calc(100vh - 250px);
  padding: 0 calc(3.5vw + 5px);
  overflow-x: hidden;
  &:after {
    background: rgba(0, 0, 0, 0.25);
    background: url("/images/home-background.png") center center / cover
    no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;


export default Home; 
