import { useState } from "react";

interface ValidationRules {
    required?: boolean;
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
  }
  
  export function useFormValidation<T extends Record<string, any>>(
    initialState: T,
    validationRules: Record<keyof T, ValidationRules>
  ) {
    const [values, setValues] = useState<T>(initialState);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    const validateField = (name: keyof T, value: any) => {
      const rules = validationRules[name];
      if (!rules) return '';
  
      if (rules.required && !value) {
        return `${String(name)} is required`;
      }
  
      if (rules.pattern && !rules.pattern.test(value)) {
        return `Invalid ${String(name)} format`;
      }
  
      if (rules.minLength && value.length < rules.minLength) {
        return `${String(name)} must be at least ${rules.minLength} characters`;
      }
  
      if (rules.maxLength && value.length > rules.maxLength) {
        return `${String(name)} must not exceed ${rules.maxLength} characters`;
      }
  
      return '';
    };
  
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));
      
      const error = validateField(name as keyof T, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    };
  
    return {
      values,
      errors,
      isSubmitting,
      handleChange,
      setIsSubmitting,
      setErrors
    };
  }