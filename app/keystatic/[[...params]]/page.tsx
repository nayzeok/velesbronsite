import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ params?: string[] }>;
};

export default async function Page({ params }: Props) {
  const resolved = await params;
  const segments = resolved.params ?? [];
  if (segments.length === 0) {
    redirect("/keystatic/dashboard");
  }
  return null;
}
