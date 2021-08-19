import * as yup from "yup";
import { MessagesValidations as messages } from "../constants";

const Account = {
  UserAccount: yup.object({
      bank_code: yup.string().required(messages.required),
      agencia: yup.string().required(messages.required),
      agencia_dv: yup.string().required(messages.required),
      conta: yup.string().required(messages),
      conta_dv: yup.string().required(messages.required),
      typeAccount: yup.string().required(messages.required).oneOf(['conta_corrente', 'conta_poupanca']),
      document_type: yup.string().required(messages.required).oneOf(['CPF', 'CNPJ']),
      document_number: yup.string().required(messages),
    }),

    getAccountById: yup.object({
      id: yup
      .number()
      .integer(messages.integer)
      .positive(messages.positive)
      .required(messages.required),
    }),

    deleteAccount: yup.object({
      id: yup
      .number()
      .integer(messages.integer)
      .positive(messages.positive)
      .required(messages.required),
    }),

    updateAccount: yup.object({
      bank_code: yup.string().required(messages.required),
      agencia: yup.string().required(messages.required),
      agencia_dv: yup.string().required(messages.required),
      conta: yup.string().required(messages),
      conta_dv: yup.string().required(messages.required),
      typeAccount: yup.string().required(messages.required).oneOf(['conta_corrente', 'conta_poupanca']),
      document_type: yup.string().required(messages.required).oneOf(['CPF', 'CNPJ']),
      document_number: yup.string().required(messages),
    })
};

export default Account;
