import React from "react";
import Footer from "../Footer";
import Nav from "../Nav";
import { CreditWrapper } from "../../context/CreditContext";
import { ProgressWrapper } from "../../context/ProgressContext";

type Props = {
  children?: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <ProgressWrapper>
      <CreditWrapper>
        <div className="min-h-screen flex flex-col justify-between">
          <Nav></Nav>
          <main>{children}</main>
          <Footer></Footer>
        </div>
      </CreditWrapper>
    </ProgressWrapper>
  );
};

export default Layout;
