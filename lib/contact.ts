import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "data", "contact");
const MESSAGES_FILE = join(DATA_DIR, "messages.json");

export type ContactMessage = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  message: string;
  attachmentName?: string;
  emailSent: boolean;
  createdAt: string;
};

async function readMessages(): Promise<ContactMessage[]> {
  try {
    const raw = await readFile(MESSAGES_FILE, "utf-8");
    return JSON.parse(raw) as ContactMessage[];
  } catch {
    return [];
  }
}

export async function saveContactMessage(entry: Omit<ContactMessage, "id" | "createdAt">): Promise<ContactMessage> {
  await mkdir(DATA_DIR, { recursive: true });
  const messages = await readMessages();
  const record: ContactMessage = {
    ...entry,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  messages.push(record);
  await writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2), "utf-8");
  return record;
}
