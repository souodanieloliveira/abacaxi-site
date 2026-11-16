// Conferência do WhatsApp da calculadora, usada no navegador e no servidor (aprovada por Daniel em 16/11/2026 12:49).
// Aceita só DDDs que existem; celular com 9 dígitos começando com 9; fixo com 8 dígitos começando de 2 a 5.

const DDDS = new Set([
  11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38, 41, 42, 43, 44, 45, 46, 47,
  48, 49, 51, 53, 54, 55, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87,
  88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99,
]);

// Recebe só os dígitos, sem o 55 do país.
export function digitosWhatsappValidos(d: string): boolean {
  if (!/^\d{10,11}$/.test(d)) return false;
  if (!DDDS.has(Number(d.slice(0, 2)))) return false;
  const numero = d.slice(2);
  if (numero.length === 9) return numero[0] === "9";
  return "2345".includes(numero[0]);
}
