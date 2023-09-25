import Header from "../components/Header.tsx";
import styled from "styled-components";

const Main = () => {
  return (
    <div>
      <Header/>
      <Maintag/>
    </div>
  )
}

const Maintag = styled.main`
  width: 100%;
  height: 300rem;
`

export default Main