import { MainFooter } from "@/components/footer/main-footer";
import { MinimalHeader } from "@/components/header/minimal-header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <MinimalHeader />
      <div className="flex-1 flex-center">{children}</div>
      <MainFooter />
    </div>
  );
}
