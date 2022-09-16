import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { useProgressContext } from "../../context/ProgressContext";
import { useCreditContext } from "../../context/CreditContext";
import TableRow from "./TableRow";

type Props = {};

const DetailTable = (props: Props) => {
  const {
    detailTable,
    detailThead,
    detailTh,
    detailTrOdd,
    detailFirstTd,
    detailTd,
    detailTrEven,
  } = styles;
  const { setProgress, progress } = useProgressContext();
  const {
    anaPara,
    taksitSayisi,
    karOrani,
    taksitAraligi,
    karHesaplamaAraligi,
    kkdf,
    bsmv,
    toplamOdeme,
  } = useCreditContext();
  let taksitTutari: number;
  let kar: number;

  if (progress === "viewDetails") {
    document.onkeydown = function (evt) {
      evt = evt || window.event;
      if (evt.keyCode === 27) {
        setProgress("calculated");
      }
    };
  }

  taksitTutari = Math.round((toplamOdeme / taksitSayisi) * 100) / 100;
  kar = Math.round((toplamOdeme - anaPara) * 100) / 100;
  const [kalanAnapara, setKalanAnapara] = useState<number>(anaPara);

  return (
    <>
      {progress === "viewDetails" && (
        <div
          className="flex flex-col justify-center items-center fixed inset-0 z-10 outline-none focus:outline-none w-5/6 m-auto overflow-auto h-2/3"
          style={{ flexFlow: "wrap" }}
        >
          <div className=" h-8 w-8 text-red-500 ml-auto sticky top-0 right-0">
            <svg
              className="fill-current"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              onClick={() => setProgress("calculated")}
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </div>
          <table className={detailTable}>
            <thead className={detailThead}>
              <tr>
                <th scope="col" className={detailTh}>
                  Taksit No
                </th>
                <th scope="col" className={detailTh}>
                  Taksit Tutarı
                </th>
                <th scope="col" className={detailTh}>
                  Ana Para
                </th>
                <th scope="col" className={detailTh}>
                  Kalan Ana Para
                </th>
                <th scope="col" className={detailTh}>
                  Kâr Tutarı
                </th>
                <th scope="col" className={detailTh}>
                  KKDF
                </th>
                <th scope="col" className={detailTh}>
                  BSMV
                </th>
              </tr>
            </thead>

            <tbody className="overflow-auto">
              {Array.from(Array(taksitSayisi).keys()).map((taksit, index) => (
                <TableRow
                  key={index}
                  index={index}
                  anaPara={anaPara}
                  taksitTutari={taksitTutari}
                  karOrani={karOrani}
                  kar={kar}
                  kkdf={kkdf}
                  bsmv={bsmv}
                  toplamOdeme={toplamOdeme}
                  kalanAnapara={kalanAnapara}
                  setKalanAnapara={setKalanAnapara}
                />
              ))}

              {/* <tr className={detailTrEven}>
                <td className={detailFirstTd}>Taksit No</td>
                <td className={detailTd}>Taksit Tutarı</td>
                <td className={detailTd}>Ana Para</td>
                <td className={detailTd}>Kalan Ana Para</td>
                <td className={detailTd}>Kâr Tutarı</td>
                <td className={detailTd}>KKDF</td>
                <td className={detailTd}>BSMV</td>
              </tr> */}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default DetailTable;
