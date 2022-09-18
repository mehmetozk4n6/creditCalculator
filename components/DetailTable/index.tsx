import React, { useRef, useEffect } from "react";
import styles from "./index.module.css";
import { useProgressContext } from "../../context/ProgressContext";
import { useCreditContext } from "../../context/CreditContext";
import TableRow from "./TableRow";

type Props = {};

const DetailTable = (props: Props) => {
  const { tableWrapper, detailTable, detailThead, detailTh, closeBtnWrapper } =
    styles;
  const { setProgress, progress } = useProgressContext();
  const { odemeler } = useCreditContext();

  // ESC tuşu table i kapatır
  if (progress === "viewDetails") {
    document.onkeydown = (evt: KeyboardEvent) => {
      if (evt.key === "Escape") {
        setProgress("calculated");
      }
    };
  }

  // taksit sayısı 0 'sa component i render etmez.
  useEffect(() => {
    if (odemeler.length < 1) return;
  }, [odemeler]);

  return (
    <>
      {progress === "viewDetails" && (
        <div className={tableWrapper} style={{ flexFlow: "wrap" }}>
          <div className={closeBtnWrapper}>
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

            <tbody>
              {odemeler.map((taksit, index) => (
                <TableRow key={index} taksit={taksit} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default DetailTable;
