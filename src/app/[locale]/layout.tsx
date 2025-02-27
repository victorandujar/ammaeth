import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getMessages } from "../helpers/getMessages";
import { store } from "../store/store";
import StoreProvider from "../store/StoreProvider";
import Layout from "../ui/shared/components/Layout/Layout";

export const metadata: Metadata = {
  title: "Ammaëth",
  description: "Diseñar es recordar lo que la materia olvidó.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  const messages = await getMessages(locale, notFound);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <StoreProvider store={store}>
            <Layout>{children}</Layout>
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
