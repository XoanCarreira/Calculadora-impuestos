const btnCalcular = document.getElementById("calcularBtn");
const txtResultado = document.getElementById("resultadoTxt");
const txtError = document.getElementById("errorTxt");
const importe = document.getElementById("importe");
const tipo = 21;

/**
 * Verifica si es un número y positivo
 * @param {number} numero Número o valor a verificar
 * @returns {boolean} 'true' si pasa la verificación, en caso contrario 'false'
 * @throws Lanza error si el parámetro no es un número o es negativo
 */
function esNumero(numero) {
  let valido = false;
  try {
    if (!isNaN(numero)) {
      if (numero >= 0) {
        valido = true;
      } else {
        valido = false;
        throw new Error("El número debe ser positivo");
      }
    } else {
      valido = false;
      throw new Error("Debe ser un número");
    }
  } catch (error) {
    txtError.textContent = `Error: ${error.message}`;
  }
  return valido;
}

/**
 * Calcula el importe total aplicando el tipo impositivo
 * @param {number} neto Importe antes de impuestos
 * @param {number} tasa Tipo impositivo a aplicar
 * @returns {number | undefined} Importe total con impuestos o 'undefined' y los datos no son válidos
 */
function calcularImpuesto(neto, tasa) {
  if (esNumero(neto) && esNumero(tasa)) {
    let total = neto + (neto * tasa) / 100;
    return total;
  }
}

/**
 * Muestra al usuario el total del cálculo en €
 * @returns {void}
 */
function mostrarCalculo() {
  let resultado = calcularImpuesto(Number(importe.value), tipo);
  txtResultado.textContent = `Total con impuestos del 21%: ${resultado}€`;
}

btnCalcular.addEventListener("click", mostrarCalculo);
