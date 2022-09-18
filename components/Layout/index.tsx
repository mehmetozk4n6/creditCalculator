import React, { useRef } from "react";
import Footer from "../Footer";
import Nav from "../Nav";
import { CreditWrapper } from "../../context/CreditContext";
import { ProgressWrapper } from "../../context/ProgressContext";
import styles from "./index.module.css";
import { MyRef } from "../Footer/index";

type Props = {
  children?: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const whiteRef = useRef({ changeMode: () => {} });

  const handleClick = () => {
    whiteRef.current.changeMode();
  };

  return (
    <ProgressWrapper>
      <CreditWrapper>
        <div className={styles.wrapper}>
          <Nav />
          <button
            // Footer ın modunu değiştirmektedir.
            className={styles.changeColorBtn}
            onClick={() => handleClick()}
          >
            Renk Değiştir
          </button>
          <main>{children}</main>
          <Footer ref={whiteRef} />
        </div>
      </CreditWrapper>
    </ProgressWrapper>
  );
};

export default Layout;
