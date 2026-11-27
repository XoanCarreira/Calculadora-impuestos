const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

function createApp(importeValue) {
  const elements = {
    calcularBtn: {
      addEventListener(event, callback) {
        this.callback = callback;
      },
    },
    resultadoTxt: { textContent: "" },
    errorTxt: { textContent: "" },
    importe: { value: importeValue },
  };
  const document = {
    getElementById(id) {
      return elements[id];
    },
  };
  const source = fs.readFileSync(
    path.join(__dirname, "../src/app.js"),
    "utf8",
  );

  vm.runInNewContext(source, { document });

  return { elements, calculate: elements.calcularBtn.callback };
}

test("calcula el total con el impuesto del 21%", () => {
  const { elements, calculate } = createApp("100");

  calculate();

  assert.equal(
    elements.resultadoTxt.textContent,
    "Total con impuestos del 21%: 121€",
  );
  assert.equal(elements.errorTxt.textContent, "");
});

test("muestra un error cuando el importe no es numérico", () => {
  const { elements, calculate } = createApp("no válido");

  calculate();

  assert.equal(elements.errorTxt.textContent, "Error: Debe ser un número");
});
