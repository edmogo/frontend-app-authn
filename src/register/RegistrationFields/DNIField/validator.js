const validateDNI = (dni, formatMessage) => {
    // Expresión regular para validar un número de DNI español
    const dniRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/;
  
    // Comprobamos si el DNI tiene el formato correcto
    if (!dniRegex.test(dni)) {
      return formatMessage(messages['dni.error.invalid_format']);
    }
  
    // Extraemos el número y la letra del DNI
    const dniNumber = dni.substring(0, 8);
    const dniLetter = dni.substring(8);
  
    // Cálculo de la letra del DNI según el algoritmo oficial
    const letterIndex = dniNumber % 23;
    const validLetters = 'TRWAGMYFPDXBNJZSQVHLCKE';
    const expectedLetter = validLetters.charAt(letterIndex);
  
    // Comparamos la letra calculada con la letra proporcionada
    if (expectedLetter !== dniLetter.toUpperCase()) {
      return formatMessage(messages['dni.error.invalid_letter']);
    }
  
    // Si pasa todas las validaciones, devolvemos una cadena vacía (sin error)
    return '';
  };
  
  export default validateDNI;
  