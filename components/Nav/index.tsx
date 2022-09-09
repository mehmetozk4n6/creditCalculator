import React from "react";
import { useProgressContext } from "../../context/ProgressContext";
import styles from "./index.module.css";

type Props = {};

const Nav = (props: Props) => {
  const { progress } = useProgressContext();
  return (
    <nav>
      <div className={styles.progressBarr}>
        <div
          className={`${styles.progressCompleted} ${
            progress === "start"
              ? "w-1/12"
              : progress === "calculated"
              ? "w-1/2"
              : "w-full"
          }`}
        />
      </div>
    </nav>
  );
};

export default Nav;
