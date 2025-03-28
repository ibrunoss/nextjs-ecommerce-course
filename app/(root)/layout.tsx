import { MainFooter } from "@/components/footer/main-footer";
import { ShopHeader } from "@/components/header/shop-header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <ShopHeader />
      <main className="flex-1 wrapper">{children}</main>
      <MainFooter />
    </div>
  );
}
