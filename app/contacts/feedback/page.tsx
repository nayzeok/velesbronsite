import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import ContactForm from "../ContactForm";

export const metadata = {
  title: "Написать нам — VELESBRON",
  description: "Форма обратной связи VELESBRON: напишите нам по вопросам покупки, гарантии или сотрудничества.",
  alternates: { canonical: "/contacts/feedback" },
};

export default function ContactFeedbackPage() {
  return (
    <main
      className="min-h-screen bg-white text-[#111]"
      style={{ fontFamily: "var(--font-montserrat-light), Montserrat, sans-serif" }}
    >
      <SiteHeader />

      <div className="max-w-lg mx-auto px-4 pt-32 pb-16 min-[1200px]:pt-40">
        <Link
          href="/contacts"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-[#111]/60 hover:text-[#EA6A20] transition-colors"
        >
          <span aria-hidden="true">←</span> Контакты
        </Link>

        <ContactForm />
      </div>
    </main>
  );
}
