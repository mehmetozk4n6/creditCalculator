import React from "react";
import styles from "./index.module.css";
import { useProgressContext } from "../../context/ProgressContext";

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
  const handleClick = () => {};

  return (
    <>
      {progress === "viewDetails" && (
        <div className="flex flex-col justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <button
            className="ml-auto mr-8"
            onClick={() => setProgress("calculated")}
          >
            X
          </button>
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
              <tr className={detailTrOdd}>
                <td className={detailFirstTd}>Taksit No</td>
                <td className={detailTd}>Taksit Tutarı</td>
                <td className={detailTd}>Ana Para</td>
                <td className={detailTd}>Kalan Ana Para</td>
                <td className={detailTd}>Kâr Tutarı</td>
                <td className={detailTd}>KKDF</td>
                <td className={detailTd}>BSMV</td>
              </tr>
              <tr className={detailTrEven}>
                <td className={detailFirstTd}>Taksit No</td>
                <td className={detailTd}>Taksit Tutarı</td>
                <td className={detailTd}>Ana Para</td>
                <td className={detailTd}>Kalan Ana Para</td>
                <td className={detailTd}>Kâr Tutarı</td>
                <td className={detailTd}>KKDF</td>
                <td className={detailTd}>BSMV</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default DetailTable;
