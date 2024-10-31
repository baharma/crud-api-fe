export default function convertToFormData<T extends { [key: string]: any }>(data: T): FormData {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (typeof value === 'object' && value !== null && !(value instanceof Date)) {
        // Check for null since typeof null is 'object'
        formData.append(key, JSON.stringify(value)); // For nested objects
      } else if (typeof value === 'string' || value instanceof Blob) {
        formData.append(key, value);
      } else {
        // Convert other types to string
        formData.append(key, String(value));
      }
    });
    return formData;
  }
  