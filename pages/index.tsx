import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import CreditResult from "../components/CreditResult";
import DetailTable from "../components/DetailTable";
import PaymentForm from "../components/PaymentForm";
import { useCreditContext } from "../context/CreditContext";
import { useProgressContext } from "../context/ProgressContext";
import styles from "./Home.module.css";

const Home: NextPage = () => {
  const { progress, setProgress } = useProgressContext();

  return (
    <div className={styles.container}>
      <PaymentForm />
      <CreditResult />
      <DetailTable />
    </div>
  );
};

export default Home;
