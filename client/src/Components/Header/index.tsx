import { useState } from "react";
import * as S from "./style";

import Logo from "../../assets/logo.svg";
import Icon from "../../assets/icons/user.svg";

import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineCloseCircle } from "react-icons/ai";

export function Header(){
  const [openModal, setOpenModal] = useState(false);

  function viewMenu(){
    setOpenModal(!openModal);
  }

  return(
    <>
      { openModal ? (
          <S.Modal>
            <div className="container">
              <img src={Logo} alt="Logo Jovens Sarados" title="Logo Jovens Sarados" width="80px" height="80px" />
        
              <span onClick={ viewMenu } className="icon closed">
                <AiOutlineCloseCircle size={25} />
              </span>
        
              <ul className="nav-mobile">
                <li>
                  <a href="#">A Missão</a>
                </li>
                <li>
                  <a href="#">Eventos</a>
                </li>
                <li>
                  <a href="#">Os Jovens Sarados</a>
                </li>
              </ul>
            </div>
          </S.Modal>
        ) : (
          <S.Header>
            <a href="" className="area-logo">
              <img src={Logo} alt="Logo Jovens Sarados" title="Logo Jovens Sarados" width="80px" height="80px" />
              <span>Jovens Sarados <strong>Peruíbe</strong></span>
            </a>

            <span onClick={ viewMenu } className="icon burguer">
              <GiHamburgerMenu size={40} />
            </span>

            <nav className="area-nav">
              <ul className="nav-desktop">
                <li>
                  <a href="#">A Missão</a>
                </li>
                <li>
                  <a href="#">Eventos</a>
                </li>
                <li>
                  <a href="#">Os Jovens Sarados</a>
                </li>
              </ul>
            </nav>

            <a href="#" className="button">
              <img src={Icon} />  
              <span>Entrar</span>
            </a>
          </S.Header>
        )
      }
    </>
  );
}