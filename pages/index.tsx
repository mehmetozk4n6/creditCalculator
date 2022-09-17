import type { NextPage } from "next";
import CreditResult from "../components/CreditResult";
import DetailTable from "../components/DetailTable";
import PaymentForm from "../components/PaymentForm";
import styles from "./Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <PaymentForm />
      <CreditResult />
      <DetailTable />
    </div>
  );
};

export default Home;
