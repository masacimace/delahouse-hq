import { BrandArchiveRow } from "./BrandArchiveRow";
import type { BrandArchiveBrand } from "./BrandArchiveRow";

type BrandArchiveShowcaseProps = {
  brands: BrandArchiveBrand[];
};

export function BrandArchiveShowcase({ brands }: BrandArchiveShowcaseProps) {
  const eatAndDrinkBrands = brands.filter(
    (brand) => brand.category === "eat-drink",
  );

  const wearAndCultureBrands = brands.filter(
    (brand) => brand.category === "wear-culture",
  );

  return (
    <section className="bg-(--background) pt-6 text-(--foreground) md:pt-8">
      {eatAndDrinkBrands.length ? (
        <BrandGroup
          title="Eat & Drink"
          brands={eatAndDrinkBrands}
          startIndex={0}
        />
      ) : null}

      {wearAndCultureBrands.length ? (
        <BrandGroup
          title="Wear & Culture"
          brands={wearAndCultureBrands}
          startIndex={eatAndDrinkBrands.length}
        />
      ) : null}
    </section>
  );
}

type BrandGroupProps = {
  title: string;
  brands: BrandArchiveBrand[];
  startIndex: number;
};

function BrandGroup({ title, brands, startIndex }: BrandGroupProps) {
  return (
    <section>
      <div className="site-container-fluid py-10 md:py-14">
        <div className="mb-8 flex items-end justify-between gap-6">
          <h2 className="text-3xl font-semibold md:text-5xl">{title}</h2>
          <p className="text-sm text-(--muted)">
            {brands.length} {brands.length === 1 ? "Brand" : "Brands"}
          </p>
        </div>

        <div className="space-y-8 md:space-y-10">
          {brands.map((brand, index) => (
            <BrandArchiveRow
              key={brand._id}
              brand={brand}
              index={startIndex + index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
