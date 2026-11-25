window.addEventListener("DOMContentLoaded", init);

function init() {
  const btnCalcular = document.getElementById("calcularBtn");
  const txtResultado = document.getElementById("resultadoTxt");
  const txtError = document.getElementById("errorTxt");
  const importe = document.getElementById("importe");
  const tipo = 21;

  /**
   * Verifica si es un número y positivo
   * @param {number} numero Numero a verificar
   * @returns True o False según pase la verificación
   * @throws Si no es un número o lo es pero negativo
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
    } catch (error){
        txtError.textContent = `Error: ${error.message}`;
    }
    return valido;
  }

  /**
   * Calcula el importe total aplicando el tipo impositivo
   * @param {number} neto Importe antes de impuestos
   * @param {number} tasa Tipo impositivo a aplicar
   * @returns Importe total con impuestos
   */
  function calcularImpuesto(neto, tasa) {
    if (esNumero(neto) && esNumero(tasa)) {
      let total = neto + (neto * tasa) / 100;
      return total;
    }
  }

  function mostarCalculo() {
    let resultado = calcularImpuesto(Number(importe.value), tipo);
    txtResultado.textContent = `Total con impuestos del 21%: ${resultado}€`;
  }

  btnCalcular.addEventListener("click", mostarCalculo);
}
