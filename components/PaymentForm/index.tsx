import React from "react";
import { useFormik } from "formik";
import validationSchema from "./validations";
import styles from "./index.module.css";
import { useCreditContext } from "../../context/CreditContext";
import { useProgressContext } from "../../context/ProgressContext";

type Props = {};

const PaymentForm = (props: Props) => {
  const {
    anaPara,
    setAnaPara,
    taksitSayisi,
    setTaksitSayisi,
    karOrani,
    setKarOrani,
    taksitAraligi,
    setTaksitAraligi,
  } = useCreditContext();
  const { setProgress } = useProgressContext();

  const handleReset = () => {
    setProgress("start");
    setAnaPara(0);
    setTaksitSayisi(0);
    setTaksitAraligi("yillik");
  };

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        anaPara,
        taksitSayisi,
        karOrani,
        taksitAraligi,
      },
      enableReinitialize: true,
      onSubmit: (values) => {
        console.log(values);

        setAnaPara(values.anaPara);
        setTaksitSayisi(values.taksitSayisi);
        setKarOrani(values.karOrani);
        setTaksitAraligi(values.taksitAraligi);

        setProgress("calculated");
      },
      validationSchema,
    });

  return (
    <div className={styles.paymentFormWrapper}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formLine}>
          <label className={styles.formLabel} htmlFor="anaPara">
            Kredi Tutarı
          </label>
          <input
            name="anaPara"
            id="anaPara"
            value={values.anaPara}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ana Para"
            className={styles.formInput}
          />
        </div>
        {errors.anaPara && touched.anaPara && (
          <div className={styles.formError}>{errors.anaPara}</div>
        )}
        <div className={styles.formLine}>
          <label className={styles.formLabel} htmlFor="taksitSayisi">
            Taksit Sayısı
          </label>
          <input
            name="taksitSayisi"
            id="taksitSayisi"
            value={values.taksitSayisi}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Taksit Sayısı"
            className={styles.formInput}
          />
        </div>
        {errors.taksitSayisi && touched.taksitSayisi && (
          <div className={styles.formError}>{errors.taksitSayisi}</div>
        )}

        <div className={styles.formLine}>
          <label className={styles.formLabel} htmlFor="karOrani">
            Kar Oranı
          </label>
          <input
            name="karOrani"
            id="karOrani"
            value={values.karOrani}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Kar Oranı"
            className={styles.formInput}
          />
        </div>
        {errors.karOrani && touched.karOrani && (
          <div className={styles.formError}>{errors.karOrani}</div>
        )}

        <div className={styles.formLine}>
          <label className={styles.formLabel} htmlFor="taksitAraligi">
            Taksit Aralığı
          </label>
          <select
            name="taksitAraligi"
            id="taksitAraligi"
            value={values.taksitAraligi}
            onChange={handleChange}
            onBlur={handleBlur}
            className={styles.formInput}
          >
            <option value="haftalik">Haftalık</option>
            <option value="aylik">Aylık</option>
            <option value="yillik">Yıllık</option>
          </select>
          {/* <input /> */}
        </div>
        {errors.taksitAraligi && touched.taksitAraligi && (
          <div className={styles.formError}>{errors.taksitAraligi}</div>
        )}
        <div className={`${styles.formLine}`}>
          <button
            className={styles.resetButton}
            onClick={() => handleReset()}
            type="reset"
          >
            Reset
          </button>
          <button className={styles.calculateButton} type="submit">
            Hesapla
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
