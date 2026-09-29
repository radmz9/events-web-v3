import { z } from "zod";
import { REGEX } from "../rules/regex";
import { validationMessages as msg } from "../messages/validation.messages";

export const passwordBlock = z
  .string()
  .min(8, msg.min_length(8))
  .max(20, msg.max_length(20))
  .regex(REGEX.ALPHANUMERIC, msg.lettersNumbers);

export const codeBlock = z  
  .string()
  .min(7, msg.min_length(7))
  .max(9, msg.min_length(9))
  .regex(REGEX.CODE_PATTERN, msg.lettersNumbers);

export const eventKey = z
  .string()
  .length(5, "Longitud de valores debe ser de 5 caracteres")
  .regex(REGEX.CODE_PATTERN, msg.lettersNumbers);

export const baseKey = z
  .string()
  .min(3, msg.min_length(3))
  .max(6, msg.max_length(6))
  .regex(REGEX.KEY_PATTERN, msg.onlyLetters);

export const baseString = z
  .string()
  .min(3, msg.min_length(3))
  .max(250, msg.max_length(250))
  .regex(REGEX.ONLY_LETTERS_EXTENDED, msg.onlyLetters)

export const baseStringOptional = z
  .string()
  .min(3, msg.min_length(3))
  .max(250, msg.max_length(250))
  .regex(REGEX.ONLY_LETTERS_EXTENDED, msg.onlyLetters)
  .optional()

export const calendarPattern = z  
  .string()
  .length(5, 'Longitud de 5 caracteres')
  .regex(REGEX.CALENDAR_PATTERN, 'Solo numeros y una letra A|B')

export const stringWithLimit = (min: number, max: number) => z
  .string()
  .min(min, msg.min_length(min))
  .max(max, msg.max_length(max))
  .regex(REGEX.ONLY_LETTERS_EXTENDED, msg.onlyLetters)