import type { FormErrors } from "../types";

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return phoneRegex.test(phone);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 5;
};

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};

export const validateLoginForm = (
  phone: string,
  password: string
): FormErrors => {
  const errors: FormErrors = {};

  if (!phone.trim()) {
    errors.phone = "Phone is required";
  } else if (!validatePhone(phone)) {
    errors.phone = "Pleas enter a valid phone";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (!validatePassword(password)) {
    errors.password = "Password must be at least 8 characters long";
  }

  return errors;
};

export const validateSignupForm = (
  name: string,
  phone: string,
  password: string,
  confirmPassword: string,
  district: string,
  sector: string,
  cell: string,
  village: string
): FormErrors => {
  const errors: FormErrors = {};

  if (!name.trim()) {
    errors.name = "Full name is required";
  } else if (!validateName(name)) {
    errors.name = "Name must be at least 2 characters long";
  }

  if (!phone.trim()) {
    errors.phone = "Email is required";
  } else if (!validatePhone(phone)) {
    errors.phone = "Please enter a phone number";
  }
  if (!district.trim()) {
    errors.district = "District is required";
  }
  if (!sector.trim()) {
    errors.sector = "Sector is required";
  }
  if (!cell.trim()) {
    errors.cell = "Cell is required";
  }
  if (!village.trim()) {
    errors.village = "Village is required";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (!validatePassword(password)) {
    errors.password = "Password must be at least 8 characters long";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};
