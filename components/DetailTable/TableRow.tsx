import styles from "./index.module.css";
import { useEffect } from "react";
type Props = {
  index: number;
  anaPara: number;
  taksitTutari: number;
  karOrani: number;
  kar: number;
  kkdf: number;
  bsmv: number;
  toplamOdeme: number;
  kalanAnapara: number;
  setKalanAnapara: React.Dispatch<React.SetStateAction<number>>;
};

const TableRow = ({
  index,
  taksitTutari,
  karOrani,
  kar,
  kkdf,
  bsmv,
  toplamOdeme,
  kalanAnapara,
  setKalanAnapara,
}: Props) => {
  const {
    detailTable,
    detailThead,
    detailTh,
    detailTrOdd,
    detailFirstTd,
    detailTd,
    detailTrEven,
  } = styles;

  let kartutari = (kalanAnapara * karOrani) / 100;

  useEffect(() => {
    return () => {
      setKalanAnapara(kalanAnapara - (taksitTutari - kartutari));
    };
  });

  return (
    <tr className={index % 2 === 0 ? detailTrOdd : detailTrEven}>
      <td className={detailFirstTd}>{index + 1}</td>
      <td className={detailTd}>{taksitTutari}</td>
      <td className={detailTd}>{taksitTutari - kartutari}</td>
      <td className={detailTd}>{kalanAnapara - (taksitTutari - kartutari)}</td>
      <td className={detailTd}>{kartutari}</td>
      <td className={detailTd}>{(kartutari * kkdf) / 100}</td>
      <td className={detailTd}>{(kartutari * bsmv) / 100}</td>
    </tr>
  );
};

export default TableRow;
