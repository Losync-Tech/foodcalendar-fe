export class ClientApiError extends Error {
  constructor(public status: number, public fields: Record<string, unknown>) {
    super(typeof fields.message === "string" ? fields.message : "Não foi possível concluir. Confira os campos e tente novamente.");
  }
}
export async function mutate<T = unknown>(path: string, method: string, body?: unknown): Promise<T> {
  let response: Response;
  let text: string;
  try {
    response = await fetch("/api" + path, {
      method, headers: body ? { "Content-Type": "application/json" } : {},
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
    text = await response.text();
  } catch {
    throw new ClientApiError(503, { message: "Resultado não confirmado. Confira os dados antes de repetir.", uncertain: true });
  }
  let result;
  try { result = text ? JSON.parse(text) : undefined; } catch { throw new ClientApiError(503, { message: "Resposta inesperada. Confira os dados antes de repetir.", uncertain: true }); }
  if (!response.ok) throw new ClientApiError(response.status, result ?? {});
  return result as T;
}