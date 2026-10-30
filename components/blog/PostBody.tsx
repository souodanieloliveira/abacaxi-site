import Link from "next/link";
import type { ReactNode } from "react";

const INLINE = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;

function renderInline(text: string): ReactNode[] {
  return text.split(INLINE).map((part, i) => {
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      return href.startsWith("/") ? (
        <Link key={i} href={href}>
          {label}
        </Link>
      ) : (
        <a key={i} href={href} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      );
    }
    return part;
  });
}

// Tabela em markdown: todas as linhas começam com "|"; a segunda é o separador (|---|---:|).
function isTable(block: string): boolean {
  const lines = block.split("\n");
  return lines.length >= 2 && lines.every((l) => l.trim().startsWith("|")) && /^\|[\s:|-]+\|$/.test(lines[1].trim());
}

function cells(line: string): string[] {
  return line.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
}

function renderTable(block: string, key: number) {
  const [head, sep, ...rows] = block.split("\n");
  const right = cells(sep).map((c) => c.endsWith(":"));
  const align = (j: number) => (right[j] ? { textAlign: "right" as const } : undefined);
  return (
    <div key={key} className="post-table">
      <table>
        <thead>
          <tr>
            {cells(head).map((c, j) => (
              <th key={j} style={align(j)}>
                {renderInline(c)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri}>
              {cells(r).map((c, j) => (
                <td key={j} style={align(j)}>
                  {renderInline(c)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Renderiza o corpo em markdown simples (ver content/blog/types.ts). */
export default function PostBody({ body }: { body: string }) {
  const blocks = body.trim().split(/\n{2,}/);

  return (
    <div className="post-body">
      {blocks.map((block, i) =>
        block.startsWith("## ") ? (
          <h2 key={i}>{renderInline(block.slice(3))}</h2>
        ) : isTable(block) ? (
          renderTable(block, i)
        ) : (
          <p key={i}>{renderInline(block)}</p>
        ),
      )}
    </div>
  );
}
