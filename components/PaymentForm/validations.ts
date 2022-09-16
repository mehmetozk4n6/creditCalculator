import { type } from "os";
import * as yup from "yup";


const validations = yup.object().shape({
  anaPara: yup.number().typeError('Numara girmelisiniz').min(0, "0'dan büyük olmalı").required("zorunlu alan")
  .test(
      'no-leading-zero',
      '0 ile başlamamalıdır.',
      (value, context) => {
        return (value && value>=1) && (context.originalValue && (context.originalValue).toString().startsWith("0") ) ? false:true ;
      }
    )
    ,
  taksitSayisi: yup.number().typeError('Numara girmelisiniz').min(0, "0'dan büyük olmalı").required("zorunlu alan")
  .test(
      'no-leading-zero',
      '0 ile başlamamalıdır.',
      (value, context) => {
        return (value && value>=1) && (context.originalValue && context.originalValue.toString().startsWith("0") ) ? false:true ;
      }
    )
    ,
  karOrani: yup.number().typeError('Numara girmelisiniz').min(0, "0'dan büyük olmalı").required("zorunlu alan")
  .test(
      'no-leading-zero',
      '0 ile başlamamalıdır.',
      (value, context) => {
        return (value && value>=1) && (context.originalValue && context.originalValue.toString().startsWith("0") ) ? false:true ;
      }
    )
    ,
  taksitAraligi: yup.string().required("zorunlu alan"),
  kkdf: yup.number().typeError('Numara girmelisiniz').min(0, "0'dan büyük olmalı").max(100,"100'den küçük olmalı").required("zorunlu alan")
  .test(
      'no-leading-zero',
      '0 ile başlamamalıdır.',
      (value, context) => {
        return (value && value>=1) && (context.originalValue && context.originalValue.toString().startsWith("0") ) ? false:true ;
      }
    )
    ,
  bsmv: yup.number().typeError('Numara girmelisiniz').min(0, "0'dan büyük olmalı").max(100,"100'den küçük olmalı").required("zorunlu alan")
  .test(
      'no-leading-zero',
      '0 ile başlamamalıdır.',
      (value, context) => {
        return (value && value>=1) && (context.originalValue && context.originalValue.toString().startsWith("0") ) ? false:true ;
      }
    )
    ,
});

export default validations;