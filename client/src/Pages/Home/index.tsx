import * as S from "./style";

import { Header } from "../../Components/Header";

export function Home(){
  return(
    <S.Background>
      <S.Container>
        <Header />
          <main className="area-info">
            <div className="info-area-title">
              <h1>Jovens Sarados</h1>
              <span>Missão Peruíbe - SP</span>
            </div>
            <h3>Loucos por almas, sedentos por santidade!</h3>
            <h4>“Nós existiremos enquanto permanecer em nós essa loucura por salvar almas jovens!”</h4>
          </main>
      </S.Container>
    </S.Background>
  );
}