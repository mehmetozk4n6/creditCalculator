import styles from "./index.module.css";

type Props = {
  taksit: any;
};

const TableRow = ({ taksit }: Props) => {
  const { detailTrOdd, detailFirstTd, detailTd, detailTrEven } = styles;

  return (
    <tr className={taksit.TAKSITNO % 2 === 0 ? detailTrOdd : detailTrEven}>
      <td className={detailFirstTd}>{taksit.TAKSITNO}</td>
      <td className={detailTd}>{taksit.TAKSITTUTARI}</td>
      <td className={detailTd}>{taksit.ANAPARA}</td>
      <td className={detailTd}>{taksit.KALANANAPARA}</td>
      <td className={detailTd}>{taksit.KARTUTARI}</td>
      <td className={detailTd}>{taksit.KKDF}</td>
      <td className={detailTd}>{taksit.BSMV}</td>
    </tr>
  );
};

export default TableRow;
