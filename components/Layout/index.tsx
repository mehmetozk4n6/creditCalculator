import React, { useRef } from "react";
import Footer from "../Footer";
import Nav from "../Nav";
import { CreditWrapper } from "../../context/CreditContext";
import { ProgressWrapper } from "../../context/ProgressContext";

type Props = {
  children?: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const whiteRef = useRef();

  return (
    <ProgressWrapper>
      <CreditWrapper>
        <div className="min-h-screen flex flex-col justify-between bg-gray-100">
          <Nav />
          <button
            className="fixed bg-blue-300 hover:bg-blue-500 top-2 text-white border-round-md px-2"
            onClick={() => whiteRef.current.changeMode()}
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
