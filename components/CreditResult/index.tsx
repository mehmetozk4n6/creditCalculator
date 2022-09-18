import React from "react";
import { useProgressContext } from "../../context/ProgressContext";
import { useCreditContext } from "../../context/CreditContext";
import styles from "./index.module.css";

type Props = {};

const CreditResult = (props: Props) => {
  const { setProgress, progress } = useProgressContext();
  const { anaPara, taksitSayisi, toplamOdeme } = useCreditContext();
  const { card, cardLine, cardOdeme, cardButton } = styles;

  // context den alığı verileri hesaplar
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
            <p className="text-xs">Yıl 360 gün olarak hesaplanmıştır.</p>
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
