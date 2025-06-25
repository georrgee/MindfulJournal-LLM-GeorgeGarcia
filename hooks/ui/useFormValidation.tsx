import { useState } from "react";
import { ValidationFormErrors, ValidationRules } from "./types";

export const useFormValidation = () => {

  // * MARK - Variables & Hooks
  const [errors, setErrors] = useState<ValidationFormErrors>({});

  // * MARK - Functions
  /**
   * @param email a string that represents a user's email
   * @description Function that returns a a boolean where it 
   * indicates if the email is valid (Example: test@gmail.com is a valid email; true)
   */
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /** 
   * @param { string } password a string that represents a user's password
   * @description { boolean } This function handles the password validation of checking if the password has
   * a minimum 6 characters, at least one uppercase letter and one special character (Example: Password123!) */
  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/;
    return passwordRegex.test(password);
  };

  const validate = (values: { [key: string]: string }, rules: ValidationRules): boolean => {

    const newErrors: ValidationFormErrors = {};

    if (rules.email && values.email) {
      if (!validateEmail(values.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (rules.password && values.password) {
      if (!validatePassword(values.password)) {
        newErrors.password = 'Password must be at least 6 characters with one uppercase letter and one special character';
      }
    }

    if (rules.confirmPassword && values.confirmPassword) {
      if (values.password !== values.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearErrors = () => setErrors({});

  // * MARK - Main
  return {
    errors,
    validate,
    clearErrors,
  };
};