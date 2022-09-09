import React from "react";
import { useProgressContext } from "../../context/ProgressContext";

type Props = {};

const CreditResult = (props: Props) => {
  const { setProgress } = useProgressContext();
  return (
    <div>
      <div>
        <h4>Geri Ödeme Tutarı</h4>
        <h3>10000</h3>
      </div>
      <div>
        <h4>Aylık Taksit Tutarı</h4>
        <h3>10000</h3>
      </div>
      <div>
        <h4>Toplam Vergi Tutar</h4>
        <h3>10000</h3>
      </div>
      <div>
        <button onClick={() => setProgress("viewDetails")}>
          Ödeme Tablosunu Göster
        </button>
      </div>
    </div>
  );
};

export default CreditResult;
