export interface FormValues {
  username: string;
  email: string;
  phone: string;
}

export const FORM_FIELDS: Record<keyof FormValues, { placeholder: string; rules?: object }> = {
  username: { placeholder: 'Ваше имя*', rules: { required: 'Введите имя' } },
  email: {
    placeholder: 'Почта*',
    rules: {
      required: 'Введите почту',
      pattern: { value: /\S+@\S+\.\S+/, message: 'Некорректная почта' },
    },
  },
  phone: { placeholder: 'Телефон' },
};
