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
        <div className="flex flex-col justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-5/6 mx-auto overflow-auto">
          <svg
            className="fill-current h-6 w-6 text-red-500 ml-auto mr-8"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            onClick={() => setProgress("calculated")}
          >
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>

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
