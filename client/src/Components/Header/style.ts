import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;

  height: 120px;
  width: 100%;
  padding: 20px;

  .area-logo{
    display: flex;
    align-items: center;
    gap: 10px;

    text-transform: uppercase;

    span{
      @media only screen and (max-width: 1100px){
        display: none;
      }
    }

    &:hover{
      color: #FFB400;
    }

    @media only screen and (max-width: 767px){
      display: none;
    }
  }

  .burguer{
    display: none;

    @media only screen and (max-width: 767px){
      display: block;
    }
  }

  .area-nav{
    display: flex;
    justify-content: space-between;
    align-items: center;

    .nav-desktop{
      display: flex;
      justify-content: space-around;
      gap: 30px;

      li a{
        padding: 8px 16px;

        &:hover{
          color: #FFB400;
        }
      }

      @media only screen and (max-width: 767px){
        display: none;
      }
    }
  }

  .button{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    border-radius: 8px;
    background-color: #FFB400;
    padding: 8px 16px;

    &:hover{
      opacity: 0.8;
      color: #FFFFFF;
    }
  }

`;

export const Modal = styled.div`
  position: fixed;
  top: 0;

  background-color: red;

  .container{
    display: flex;
    flex-direction: column;
    align-items: center;

    height: 100vh;
    width: 100vw;

    img{
      margin: 80px 0 32px;
    }

    .closed{
      position: absolute;
      right: 0;
      margin-top: 10px;
      margin-right: 30px;
      padding: 8px;
    }

    .nav-mobile{
      li{
        margin: 10px;
        padding: 8px;
      }
    }
  }

  @media only screen and (min-width: 768px){
    display: none;
  }
`;