import React, { createContext, useContext, useState } from "react";

type TaksitAraligi = "aylik" | "haftalik" | "yillik";
type KarHesaplamaAraligi = "aylik" | "haftalik" | "yillik" | "gunluk";

interface CreditValues {
  anaPara: number;
  setAnaPara: React.Dispatch<React.SetStateAction<number>>;
  taksitSayisi: number;
  setTaksitSayisi: React.Dispatch<React.SetStateAction<number>>;
  karOrani: number;
  setKarOrani: React.Dispatch<React.SetStateAction<number>>;
  karHesaplamaAraligi: KarHesaplamaAraligi;
  setkarHesaplamaAraligi: React.Dispatch<
    React.SetStateAction<KarHesaplamaAraligi>
  >;
  taksitAraligi: TaksitAraligi;
  setTaksitAraligi: React.Dispatch<React.SetStateAction<TaksitAraligi>>;
  kkdf: number;
  setkkdf: React.Dispatch<React.SetStateAction<number>>;
  bsmv: number;
  setbsmv: React.Dispatch<React.SetStateAction<number>>;
}

const CreditContext = createContext<CreditValues>({
  anaPara: 0,
  setAnaPara: () => 0,
  taksitSayisi: 0,
  setTaksitSayisi: () => 0,
  karOrani: 0,
  setKarOrani: () => 0,
  karHesaplamaAraligi: "yillik",
  setkarHesaplamaAraligi: () => "yillik",
  taksitAraligi: "yillik",
  setTaksitAraligi: () => "yillik",
  kkdf: 0,
  setkkdf: () => 0,
  bsmv: 0,
  setbsmv: () => 0,
});

type Props = {
  children: JSX.Element;
};

export const CreditWrapper: React.FC<Props> = ({ children }) => {
  const [anaPara, setAnaPara] = useState<number>(0);
  const [taksitSayisi, setTaksitSayisi] = useState<number>(0);
  const [karOrani, setKarOrani] = useState<number>(0);
  const [karHesaplamaAraligi, setkarHesaplamaAraligi] =
    useState<KarHesaplamaAraligi>("yillik");
  const [taksitAraligi, setTaksitAraligi] = useState<TaksitAraligi>("yillik");
  const [kkdf, setkkdf] = useState<number>(0);
  const [bsmv, setbsmv] = useState<number>(0);

  const creditValues = {
    anaPara,
    setAnaPara,
    karHesaplamaAraligi,
    setkarHesaplamaAraligi,
    taksitSayisi,
    setTaksitSayisi,
    karOrani,
    setKarOrani,
    taksitAraligi,
    setTaksitAraligi,
    kkdf,
    setkkdf,
    bsmv,
    setbsmv,
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
