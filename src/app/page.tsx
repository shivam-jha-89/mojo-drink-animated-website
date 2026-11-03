import { SiteHeader } from "@/components/site-header";
import { ScrollHero } from "@/components/hero/scroll-hero";
import { BrandStatement } from "@/components/sections/brand-statement";
import { Marquee } from "@/components/sections/marquee";
import { RefreshFeatures } from "@/components/sections/refresh-features";
import { ProductSpotlight } from "@/components/sections/product-spotlight";
import { FinalCta } from "@/components/sections/final-cta";
import { SiteFooter } from "@/components/sections/site-footer";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ice focus:px-5 focus:py-3 focus:text-xs focus:font-bold focus:uppercase focus:tracking-[0.16em] focus:text-mojo-deep"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <ScrollHero />
        <BrandStatement />
        <Marquee />
        <RefreshFeatures />
        <ProductSpotlight />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
