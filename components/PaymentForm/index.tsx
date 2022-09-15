import React, { useState, useRef } from "react";
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
    kkdf,
    setkkdf,
    bsmv,
    setbsmv,
  } = useCreditContext();
  const { setProgress } = useProgressContext();
  const [showErr, setShowErr] = useState(false);
  const anaparaRef = useRef<HTMLInputElement | null>(null);

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    handleReset,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      anaPara,
      taksitSayisi,
      karOrani,
      taksitAraligi,
      kkdf,
      bsmv,
    },
    enableReinitialize: false,
    onSubmit: (values) => {
      if (
        values.anaPara !== 0 &&
        values.taksitSayisi !== 0 &&
        values.karOrani !== 0
      ) {
        setAnaPara(Number(values.anaPara));
        setTaksitSayisi(Number(values.taksitSayisi));
        setKarOrani(Number(values.karOrani));
        setTaksitAraligi(values.taksitAraligi);
        setkkdf(Number(values.kkdf));
        setbsmv(Number(values.bsmv));

        setProgress("calculated");
      } else {
        setShowErr(true);
      }
    },
    onReset: () => {
      setProgress("start");
      setAnaPara(0);
      setKarOrani(0);
      setTaksitSayisi(0);
      setTaksitAraligi("yillik");
      setkkdf(0);
      setbsmv(0);
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
            ref={anaparaRef}
          />
        </div>
        {errors.anaPara && touched.anaPara && (
          <div className={styles.formError}>
            <span className="block sm:inline">{errors.anaPara}</span>
          </div>
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
          <div className={styles.formError}>
            <span>{errors.taksitSayisi}</span>
          </div>
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
        </div>
        {errors.taksitAraligi && touched.taksitAraligi && (
          <div className={styles.formError}>{errors.taksitAraligi}</div>
        )}
        <div className={styles.formLine}>
          <label className={styles.formLabel} htmlFor="kkdf">
            KKDF(Vergi Oranı)
          </label>
          <input
            name="kkdf"
            id="kkdf"
            value={values.kkdf}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="KKDF"
            className={styles.formInput}
          />
        </div>
        {errors.kkdf && touched.kkdf && (
          <div className={styles.formError}>{errors.kkdf}</div>
        )}
        <div className={styles.formLine}>
          <label className={styles.formLabel} htmlFor="bsmv">
            BSMV(Vergi Oranı)
          </label>
          <input
            name="bsmv"
            id="bsmv"
            value={values.bsmv}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="BSMV"
            className={styles.formInput}
          />
        </div>
        {errors.bsmv && touched.bsmv && (
          <div className={styles.formError}>{errors.bsmv}</div>
        )}
        <div className={`${styles.formLine}`}>
          <button className={styles.resetButton} onClick={handleReset}>
            Reset
          </button>
          <button className={styles.calculateButton} type="submit">
            Hesapla
          </button>
        </div>
        {showErr && (
          <div className={styles.formError}>
            <span className="block sm:inline">Eksik Bilgi Girdiniz.</span>
            <span className="absolute top-0 bottom-0 right-0 px-2 py-1">
              <svg
                className="fill-current h-6 w-6 text-red-500"
                role="button"
                onClick={() => setShowErr(false)}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>
        )}
      </form>
    </div>
  );
};

export default PaymentForm;
