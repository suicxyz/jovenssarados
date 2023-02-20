import styled from "styled-components";

export const Background = styled.div`
  background-color: #001E64;
  width: 100vw;
`;

export const Container = styled.div`
  margin: 0 auto;
  max-width: 1440px;
  height: 100vh;

  .icon{
    cursor: pointer;
  }

  .area-info{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    
    text-align: center;
    height: calc(100vh - 120px);

    .info-area-title{
      display: flex;
      flex-direction: column;
      align-items: center;

      h1{
        font-size: 2.5rem;
        text-transform: uppercase;
      }

      span{
        font-size: 1rem;
        margin-top: 20px;
      }

      @media only screen and (min-width: 768px){
        h1{
          font-size: 4rem;
        }

        span{
          font-size: 2rem;
        }
      }
    }
  
    h3{
      font-family: 'Satisfy', cursive;
      font-size: 1.5rem;
    }

    h4{
      font-size: 0.8rem;
      padding: 8px;
    }

    @media only screen and (min-width: 768px){
      h3{
        font-size: 2rem;
      }

      h4{
        font-size: 1rem;
      }
    }
  }
`;



export const Teste = styled.section`
  height: 100vh;
`;