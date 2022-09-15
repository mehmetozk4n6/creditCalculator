import React from "react";
import { useProgressContext } from "../../context/ProgressContext";
import { useCreditContext } from "../../context/CreditContext";
import styles from "./index.module.css";

type Props = {};

const CreditResult = (props: Props) => {
  const { setProgress, progress } = useProgressContext();
  const { anaPara, taksitSayisi, karOrani, taksitAraligi, kkdf, bsmv } =
    useCreditContext();
  const { cardLine, card, cardButton, cardOdeme } = styles;
  // Bileşik → Kâr = ( Anapara * ( ( 1 + kâr oranı) ^ (gün sayısı / 30) ) ) - Anapara
  // useRef, useImpretiveHandle, forwardRef kullanılması,
  let toplamOdeme =
    Math.round(anaPara * Math.pow(1 + karOrani / 100, taksitSayisi) * 100) /
    100;
  let taksitTutari = Math.round((toplamOdeme / taksitSayisi) * 100) / 100;
  let kar = Math.round((toplamOdeme - anaPara) * 100) / 100;
  return (
    <>
      {progress !== "start" && (
        <div className={card}>
          <div className={cardLine}>
            <span>Geri Ödeme Tutarı</span>
            <span className={cardOdeme}>{toplamOdeme}</span>
          </div>
          <div className={cardLine}>
            <span>Taksit Ödeme Tutarı</span>
            <span className={cardOdeme}>{taksitTutari}</span>
          </div>
          <div className={cardLine}>
            <span>Toplam Vergi Tutar</span>
            <span className={cardOdeme}>{kar}</span>
          </div>
          <div>
            <p className="text-xs">
              Faiz oranı{" "}
              {taksitAraligi === "haftalik"
                ? "haftalık"
                : taksitAraligi === "aylik"
                ? "aylık"
                : "yıllık"}{" "}
              olarak hesaplanmıştır.
            </p>
            <p className="text-xs">Yıl 360 gün hesaplanmıştır.</p>
          </div>
          <div className={cardLine}>
            <button
              className={cardButton}
              onClick={() => setProgress("viewDetails")}
            >
              Ödeme Tablosunu Göster
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreditResult;
