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
  toplamOdeme: number;
  setToplamOdeme: React.Dispatch<React.SetStateAction<number>>;
  odemeler: Array<any>;
  setOdemeler: React.Dispatch<React.SetStateAction<any>>;
}

const CreditContext = createContext<CreditValues>({
  anaPara: 0,
  setAnaPara: () => 0,
  taksitSayisi: 0,
  setTaksitSayisi: () => 0,
  karOrani: 0,
  setKarOrani: () => 0,
  karHesaplamaAraligi: "aylik",
  setkarHesaplamaAraligi: () => "aylik",
  taksitAraligi: "aylik",
  setTaksitAraligi: () => "aylik",
  kkdf: 0,
  setkkdf: () => 0,
  bsmv: 0,
  setbsmv: () => 0,
  toplamOdeme: 0,
  setToplamOdeme: () => 0,
  odemeler: [],
  setOdemeler: () => [],
});

type Props = {
  children: JSX.Element;
};

export const CreditWrapper: React.FC<Props> = ({ children }) => {
  const [anaPara, setAnaPara] = useState<number>(10000);
  const [taksitSayisi, setTaksitSayisi] = useState<number>(12);
  const [karOrani, setKarOrani] = useState<number>(1.5);
  const [karHesaplamaAraligi, setkarHesaplamaAraligi] =
    useState<KarHesaplamaAraligi>("aylik");
  const [taksitAraligi, setTaksitAraligi] = useState<TaksitAraligi>("aylik");
  const [kkdf, setkkdf] = useState<number>(15);
  const [bsmv, setbsmv] = useState<number>(5);
  const [toplamOdeme, setToplamOdeme] = useState<number>(0);
  const [odemeler, setOdemeler] = useState([]);

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
    toplamOdeme,
    setToplamOdeme,
    odemeler,
    setOdemeler,
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
