import { MainFooter } from "@/components/footer/main-footer";
import { MainHeader } from "@/components/header/main-header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <MainHeader />
      <div className="flex-1 flex-center">{children}</div>
      <MainFooter />
    </div>
  );
}
