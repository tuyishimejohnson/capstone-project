export const validatePatientForm = (basicInfo: {
  patientName: string;
  age: string;
  address: string;
}) => {
  const errors: { [key: string]: string } = {};

  if (!basicInfo.patientName.trim()) {
    errors.patientName = "Patient name is required";
  } else if (basicInfo.patientName.trim().length < 2) {
    errors.patientName = "Patient name must be at least 2 characters";
  }

  if (!basicInfo.age) {
    errors.age = "Age is required";
  } else {
    const age = parseInt(basicInfo.age);
    if (isNaN(age) || age < 0 || age > 120) {
      errors.age = "Please enter a valid age between 0 and 120";
    }
  }

  if (!basicInfo.address.trim()) {
    errors.address = "Address is required";
  } else if (basicInfo.address.trim().length < 5) {
    errors.address = "Please provide a more detailed address";
  }

  return errors;
};
