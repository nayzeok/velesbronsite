import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "data", "warranty");
const REGISTRATIONS_FILE = join(DATA_DIR, "registrations.json");

export type WarrantySource = "site" | "manager";

export type WarrantyRegistration = {
  id: string;
  code: string;
  // Поля с сайта
  phone?: string;
  firstName?: string;
  lastName?: string;
  // Поля от менеджера
  shop?: string;
  marketplace?: string;
  purchaseDate?: string;
  rating?: number;
  note?: string;
  // Мета
  source: WarrantySource;
  addedBy?: string; // имя менеджера
  siteUpdatedAt?: string; // заполняется при первом обновлении с сайта
  createdAt: string;
};

export type SiteInput = {
  code: string;
  phone: string;
  firstName: string;
  lastName?: string;
};

export type ManagerInput = {
  code: string;
  shop: string;
  marketplace: string;
  purchaseDate: string;
  firstName: string;
  rating?: number;
  note?: string;
  addedBy?: string;
};

export type ValidationError = { field: string; message: string };

function normalizeCode(raw: string): string {
  const digits = raw.trim().replace(/\D/g, "");
  // Если 5 цифр — добавить ведущий ноль (Excel срезает)
  return digits.length === 5 ? "0" + digits : digits;
}

export function validateCode(raw: string): { normalized: string; error?: ValidationError } {
  // Разрешаем произвольный текст для случаев "Утерян талон"
  const trimmed = raw.trim();
  if (!trimmed) return { normalized: "", error: { field: "code", message: "Введите номер талона" } };

  const digits = trimmed.replace(/\D/g, "");
  // Если есть нецифровые символы — принимаем как произвольную заметку
  if (digits.length !== trimmed.length) return { normalized: trimmed };

  const normalized = normalizeCode(trimmed);
  if (normalized.length !== 6) {
    return { normalized: "", error: { field: "code", message: "Код должен быть 5 или 6 цифр" } };
  }
  const month = parseInt(normalized.slice(0, 2), 10);
  if (month < 1 || month > 12) {
    return { normalized: "", error: { field: "code", message: "Первые две цифры — месяц 01–12" } };
  }
  const serial = parseInt(normalized.slice(3), 10);
  if (serial < 1) {
    return { normalized: "", error: { field: "code", message: "Последние три цифры не могут быть 000" } };
  }
  return { normalized };
}

export function validateSiteInput(input: SiteInput): ValidationError[] {
  const errors: ValidationError[] = [];
  const { error } = validateCode(input.code);
  if (error) errors.push(error);
  if (!input.phone.trim()) {
    errors.push({ field: "phone", message: "Введите телефон" });
  } else if (!/^[\d\s\+\-\(\)]{7,20}$/.test(input.phone.trim())) {
    errors.push({ field: "phone", message: "Некорректный номер телефона" });
  }
  if (!input.firstName.trim()) {
    errors.push({ field: "firstName", message: "Введите имя" });
  }
  return errors;
}

export function validateManagerInput(input: ManagerInput): ValidationError[] {
  const errors: ValidationError[] = [];
  const { error } = validateCode(input.code);
  if (error) errors.push(error);
  if (!input.shop) errors.push({ field: "shop", message: "Выберите магазин" });
  if (!input.marketplace) errors.push({ field: "marketplace", message: "Выберите маркетплейс" });
  if (!input.purchaseDate) errors.push({ field: "purchaseDate", message: "Укажите дату" });
  if (!input.firstName.trim()) errors.push({ field: "firstName", message: "Введите имя" });
  return errors;
}

async function ensureFile(): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  try { await readFile(REGISTRATIONS_FILE); }
  catch { await writeFile(REGISTRATIONS_FILE, "[]", "utf-8"); }
}

export async function readRegistrations(): Promise<WarrantyRegistration[]> {
  await ensureFile();
  return JSON.parse(await readFile(REGISTRATIONS_FILE, "utf-8")) as WarrantyRegistration[];
}

async function writeRegistrations(list: WarrantyRegistration[]): Promise<void> {
  await ensureFile();
  await writeFile(REGISTRATIONS_FILE, JSON.stringify(list, null, 2), "utf-8");
}

export async function createSiteRegistration(
  input: SiteInput
): Promise<{ ok: true; registration: WarrantyRegistration } | { ok: false; errors: ValidationError[] }> {
  const errors = validateSiteInput(input);
  if (errors.length > 0) return { ok: false, errors };

  const { normalized } = validateCode(input.code);
  const list = await readRegistrations();
  const now = new Date().toISOString();

  // Ищем запись менеджера с таким кодом
  const idx = list.findIndex((r) => r.source === "manager" && r.code === normalized);

  if (idx !== -1) {
    // Запись менеджера найдена
    if (list[idx].siteUpdatedAt) {
      // Уже обновлялась с сайта — отказываем
      return {
        ok: false,
        errors: [{ field: "code", message: "Этот талон уже был зарегистрирован" }],
      };
    }
    // Первый раз — обновляем контактные данные
    list[idx].phone = input.phone.trim();
    list[idx].firstName = input.firstName.trim();
    list[idx].lastName = input.lastName?.trim() ?? "";
    list[idx].siteUpdatedAt = now;
    await writeRegistrations(list);
    return { ok: true, registration: list[idx] };
  }

  // Записи менеджера нет — создаём новую от сайта
  const registration: WarrantyRegistration = {
    id: crypto.randomUUID(),
    code: normalized,
    phone: input.phone.trim(),
    firstName: input.firstName.trim(),
    lastName: input.lastName?.trim() ?? "",
    source: "site",
    createdAt: now,
  };
  list.push(registration);
  await writeRegistrations(list);
  return { ok: true, registration };
}

export async function createManagerRegistration(
  input: ManagerInput
): Promise<{ ok: true; registration: WarrantyRegistration } | { ok: false; errors: ValidationError[] }> {
  const errors = validateManagerInput(input);
  if (errors.length > 0) return { ok: false, errors };
  const { normalized } = validateCode(input.code);
  const list = await readRegistrations();
  const registration: WarrantyRegistration = {
    id: crypto.randomUUID(),
    code: normalized,
    shop: input.shop,
    marketplace: input.marketplace,
    purchaseDate: input.purchaseDate,
    firstName: input.firstName.trim(),
    rating: input.rating,
    note: input.note?.trim(),
    source: "manager",
    addedBy: input.addedBy,
    createdAt: new Date().toISOString(),
  };
  list.push(registration);
  await writeRegistrations(list);
  return { ok: true, registration };
}
