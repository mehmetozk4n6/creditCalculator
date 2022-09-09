import * as yup from "yup";

const validations = yup.object().shape({
  anaPara: yup.number().required("zorunlu alan"),
  taksitSayisi: yup.number().required("zorunlu alan"),
  karOrani: yup.number().required("zorunlu alan"),
  taksitAraligi: yup.string().required("zorunlu alan"),
});

export default validations;