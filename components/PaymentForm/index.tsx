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
    karHesaplamaAraligi,
    setkarHesaplamaAraligi,
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
    setToplamOdeme,
    setOdemeler,
  } = useCreditContext();

  const { setProgress } = useProgressContext();
  const [showErr, setShowErr] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
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
      karHesaplamaAraligi,
      taksitAraligi,
      kkdf,
      bsmv,
    },
    enableReinitialize: false,
    onSubmit: (values) => {
      if (
        // anapara, taksit sayısı, karoranı 0 olduğunda submit etme
        Number(values.anaPara) !== 0 &&
        Number(values.taksitSayisi) !== 0 &&
        Number(values.karOrani) !== 0
      ) {
        // creditContext e değerleri gönder
        setAnaPara(Number(values.anaPara));
        setTaksitSayisi(Number(values.taksitSayisi));
        setKarOrani(Number(values.karOrani));
        setkarHesaplamaAraligi(values.karHesaplamaAraligi);
        setTaksitAraligi(values.taksitAraligi);
        setkkdf(Number(values.kkdf));
        setbsmv(Number(values.bsmv));

        /*
          Kullanılan Formul:

          Aylık taksit tutarı = Anapara / (((1+karOranı)^donemsayisi-1) / ((1+karOranı)^donemsayisi*karOranı))

        */

        // donem sayısı seçeneklere göre hesabı
        let donemsayisi =
          (Number(values.taksitSayisi) *
            (values.taksitAraligi === "haftalik"
              ? 7
              : values.taksitAraligi === "aylik"
              ? 30
              : 360)) /
          (values.karHesaplamaAraligi === "haftalik"
            ? 7
            : values.karHesaplamaAraligi === "aylik"
            ? 30
            : values.karHesaplamaAraligi === "gunluk"
            ? 1
            : 360);

        // yapılacak olan toplam ödeme
        let toplamOdem =
          (Number(values.anaPara) /
            ((Math.pow(1 + Number(values.karOrani) / 100, donemsayisi) - 1) /
              ((Math.pow(1 + Number(values.karOrani) / 100, donemsayisi) *
                Number(values.karOrani)) /
                100))) *
          donemsayisi;

        // iki ondalığa yuvarlama işlemi
        let toplamOde = Math.round(toplamOdem * 100) / 100;

        setToplamOdeme(toplamOde);

        // ödenecek toplam taksit tutarı
        let taksitTutari =
          Math.round((toplamOde / Number(values.taksitSayisi)) * 100) / 100;

        // taksitleri hesaplamak için kullanılacak olan anapara
        let kalananapara = Number(values.anaPara);

        let taksitler = [];

        for (let index = 1; index <= Number(values.taksitSayisi); index++) {
          let TAKSITNO = index;
          let TAKSITTUTARI = taksitTutari;
          let KARTUTARI = Math.round(kalananapara * values.karOrani) / 100; // her dönemki kar tutarı kalan anaparanın karoranı ile çarpımına eşittir
          let ANAPARA = Math.round((TAKSITTUTARI - KARTUTARI) * 100) / 100; // taksit tutarı içindeki ödenenen anapara
          let KKDF = Math.round(KARTUTARI * kkdf) / 100; // karOranının kkdf ile çarpımı
          let BSMV = Math.round(KARTUTARI * bsmv) / 100; // karOranının bsmv ile çarpımı
          let KALANANAPARA = Math.round((kalananapara - ANAPARA) * 100) / 100;

          // taksitleri dizi içerisina gönderie
          taksitler.push({
            TAKSITNO,
            TAKSITTUTARI,
            ANAPARA,
            KALANANAPARA,
            KARTUTARI,
            KKDF,
            BSMV,
          });

          // kalan anapara hesabını tekrar yapmanın sebebi yuvarlamalarla oluşacak farklılıkların kaldırılması ve bir sonraki döneme düşen anaparayı devretmek
          kalananapara =
            kalananapara -
            (toplamOdem / Number(values.taksitSayisi) -
              (kalananapara * Number(values.karOrani)) / 100);
        }

        // taksitleri context e gönderir
        setOdemeler(taksitler);
        // hata mesajı açıksa kapatıe
        setShowErr(false);
        // Progress barı çıkartıp diğer component açar
        setProgress("calculated");
      } else {
        if (Number(values.karOrani) === 0)
          setError("Kar Oranı bilgisi 0 olamaz");
        if (Number(values.taksitSayisi) === 0)
          setError("Taksit Sayısı bilgisi 0 olamaz");
        if (Number(values.anaPara) === 0) setError("Anapara bilgisi 0 olamaz");

        setShowErr(true);
      }
    },
    onReset: () => {
      setProgress("start");
      setAnaPara(0);
      setKarOrani(0);
      setTaksitSayisi(0);
      setkarHesaplamaAraligi("aylik");
      setTaksitAraligi("aylik");
      setkkdf(15);
      setbsmv(5);
      setOdemeler([]);
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
          <label className={styles.formLabel} htmlFor="karOrani">
            Kar Oranı (%)
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
          <label className={styles.formLabel} htmlFor="karHesaplamaAraligi">
            Kar Hesaplama Aralığı
          </label>
          <select
            name="karHesaplamaAraligi"
            id="karHesaplamaAraligi"
            value={values.karHesaplamaAraligi}
            onChange={handleChange}
            onBlur={handleBlur}
            className={styles.formInput}
          >
            <option value="gunluk">Günlük</option>
            <option value="haftalik">Haftalık</option>
            <option value="aylik">Aylık</option>
            <option value="yillik">Yıllık</option>
          </select>
        </div>
        {errors.karHesaplamaAraligi && touched.karHesaplamaAraligi && (
          <div className={styles.formError}>{errors.karHesaplamaAraligi}</div>
        )}

        <div className={styles.formLine}>
          <label className={styles.formLabel} htmlFor="kkdf">
            KKDF(Vergi Oranı %)
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
            BSMV(Vergi Oranı %)
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
            <span className="block sm:inline">{error}</span>
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
