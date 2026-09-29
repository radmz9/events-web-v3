// validation.messages.ts
export const validationMessages = {
  required: "Este campo es obligatorio",
  lettersNumbers: "Solo letras y numeros",
  onlyLetters: "Solo letras",
  min_length: (min: number) => `Debe tener al menos ${min} caracteres`,
  max_length: (max: number) => `Caracteres permitidos: ${max}`
};