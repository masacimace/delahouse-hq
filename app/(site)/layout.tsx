import { Footer } from "@/components/Footer";
import { FooterVisibility } from "@/components/FooterVisibility";
import { Navbar } from "@/components/Navbar";
import { Providers } from "@/components/Providers";
import { RouteSplash } from "@/components/RouteSplash";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <Navbar />
      <RouteSplash />
      {children}
      <FooterVisibility>
        <Footer />
      </FooterVisibility>
    </Providers>
  );
}
