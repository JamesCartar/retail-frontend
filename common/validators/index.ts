/**
 * Form Validation Schemas
 * Centralized validation rules for React Hook Form
 */

import { VALIDATION_MESSAGES } from '../constants';

// Email validation
export const emailValidation = {
  required: VALIDATION_MESSAGES.REQUIRED,
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: VALIDATION_MESSAGES.EMAIL,
  },
};

// Password validation
export const passwordValidation = {
  required: VALIDATION_MESSAGES.REQUIRED,
  minLength: {
    value: 8,
    message: VALIDATION_MESSAGES.MIN_LENGTH(8),
  },
};

// Required field validation
export const requiredValidation = {
  required: VALIDATION_MESSAGES.REQUIRED,
};

// Name validation
export const nameValidation = {
  required: VALIDATION_MESSAGES.REQUIRED,
  minLength: {
    value: 2,
    message: VALIDATION_MESSAGES.MIN_LENGTH(2),
  },
  maxLength: {
    value: 100,
    message: VALIDATION_MESSAGES.MAX_LENGTH(100),
  },
};

// Title validation
export const titleValidation = {
  required: VALIDATION_MESSAGES.REQUIRED,
  minLength: {
    value: 3,
    message: VALIDATION_MESSAGES.MIN_LENGTH(3),
  },
  maxLength: {
    value: 200,
    message: VALIDATION_MESSAGES.MAX_LENGTH(200),
  },
};

// Description validation
export const descriptionValidation = {
  maxLength: {
    value: 1000,
    message: VALIDATION_MESSAGES.MAX_LENGTH(1000),
  },
};

// Amount/Price validation
export const amountValidation = {
  required: VALIDATION_MESSAGES.REQUIRED,
  min: {
    value: 0.01,
    message: VALIDATION_MESSAGES.POSITIVE_NUMBER,
  },
  valueAsNumber: true,
};

// Optional amount validation
export const optionalAmountValidation = {
  min: {
    value: 0,
    message: VALIDATION_MESSAGES.POSITIVE_NUMBER,
  },
  valueAsNumber: true,
};

// Date validation
export const dateValidation = {
  required: VALIDATION_MESSAGES.REQUIRED,
  validate: (value?: string) => {
    if (!value) return VALIDATION_MESSAGES.REQUIRED;
    const date = new Date(value);
    return !isNaN(date.getTime()) || VALIDATION_MESSAGES.INVALID_DATE;
  },
};

// Optional date validation
export const optionalDateValidation = {
  validate: (value?: string) => {
    if (!value) return true;
    const date = new Date(value);
    return !isNaN(date.getTime()) || VALIDATION_MESSAGES.INVALID_DATE;
  },
};

// Record Form Validation Schema
export const recordFormValidation = {
  title: titleValidation,
  description: descriptionValidation,
  amount: optionalAmountValidation,
  date: dateValidation,
  category: {},
  customerId: {},
};

// Fee Form Validation Schema
export const feeFormValidation = {
  name: nameValidation,
  amount: amountValidation,
  description: descriptionValidation,
  type: requiredValidation,
  dueDate: optionalDateValidation,
  recordId: {},
};

// Login Form Validation Schema
export const loginFormValidation = {
  email: emailValidation,
  password: passwordValidation,
};

// Register Form Validation Schema
export const registerFormValidation = {
  name: nameValidation,
  email: emailValidation,
  password: passwordValidation,
};

// Custom validation helpers
export const validationHelpers = {
  /**
   * Validate if date is in the future
   */
  isFutureDate: (value: string) => {
    const date = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today || 'Date must be in the future';
  },

  /**
   * Validate if date is in the past
   */
  isPastDate: (value: string) => {
    const date = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date <= today || 'Date must be in the past';
  },

  /**
   * Validate if value matches another field
   */
  matchesField: (fieldName: string, fieldLabel: string) => {
    return (value: string, formValues: any) => {
      return value === formValues[fieldName] || `Must match ${fieldLabel}`;
    };
  },

  /**
   * Validate minimum value
   */
  minValue: (min: number) => {
    return (value: number) => {
      return value >= min || `Must be at least ${min}`;
    };
  },

  /**
   * Validate maximum value
   */
  maxValue: (max: number) => {
    return (value: number) => {
      return value <= max || `Must be at most ${max}`;
    };
  },

  /**
   * Validate string pattern
   */
  pattern: (regex: RegExp, message: string) => {
    return (value: string) => {
      return regex.test(value) || message;
    };
  },
};
