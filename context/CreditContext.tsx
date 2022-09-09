import React, { createContext, useContext, useState } from "react";

type TaksitAraligi = "aylik" | "haftalik" | "yillik";

interface CreditValues {
  anaPara: number;
  setAnaPara: React.Dispatch<React.SetStateAction<number>>;
  taksitSayisi: number;
  setTaksitSayisi: React.Dispatch<React.SetStateAction<number>>;
  karOrani: number;
  setKarOrani: React.Dispatch<React.SetStateAction<number>>;
  taksitAraligi: TaksitAraligi;
  setTaksitAraligi: React.Dispatch<React.SetStateAction<TaksitAraligi>>;
}

const CreditContext = createContext<CreditValues>({
  anaPara: 0,
  setAnaPara: () => 0,
  taksitSayisi: 0,
  setTaksitSayisi: () => 0,
  karOrani: 0,
  setKarOrani: () => 0,
  taksitAraligi: "yillik",
  setTaksitAraligi: () => "yillik",
});

type Props = {
  children: JSX.Element;
};

export const CreditWrapper: React.FC<Props> = ({ children }) => {
  const [anaPara, setAnaPara] = useState<number>(0);
  const [taksitSayisi, setTaksitSayisi] = useState<number>(0);
  const [karOrani, setKarOrani] = useState<number>(0);
  const [taksitAraligi, setTaksitAraligi] = useState<TaksitAraligi>("yillik");

  const creditValues = {
    anaPara,
    setAnaPara,
    taksitSayisi,
    setTaksitSayisi,
    karOrani,
    setKarOrani,
    taksitAraligi,
    setTaksitAraligi,
  };

  return (
    <CreditContext.Provider value={creditValues}>
      {children}
    </CreditContext.Provider>
  );
};

export const useCreditContext = () => {
  return useContext(CreditContext);
};
