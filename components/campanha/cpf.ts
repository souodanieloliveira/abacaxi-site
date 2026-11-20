// CPF da compra da campanha (20/11/2026 14:10: "sim, inclui"). Usado no navegador e no servidor.

export function digitosCpf(bruto: string) {
  return bruto.replace(/\D/g, "").slice(0, 11);
}

// Confere os dois dígitos verificadores e recusa sequências repetidas (000.000.000-00 etc.).
export function cpfValido(bruto: string) {
  const d = digitosCpf(bruto);
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;
  const n = d.split("").map(Number);
  for (const tamanho of [9, 10]) {
    let soma = 0;
    for (let i = 0; i < tamanho; i++) soma += n[i] * (tamanho + 1 - i);
    const resto = (soma * 10) % 11;
    if ((resto === 10 ? 0 : resto) !== n[tamanho]) return false;
  }
  return true;
}

export function mascaraCpf(bruto: string) {
  const d = digitosCpf(bruto);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
}
