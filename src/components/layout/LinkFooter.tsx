import  Link  from "next/link";
import MainLink from "@/components/shared/mainLink";


// const categories = [
//   { name: "الأرز", slug: "rice" },
//   { name: "القمح", slug: "wheat" },
//   { name: "الدقيق", slug: "flour" },
//   { name: "السكر", slug: "sugar" },
//   { name: "الزيوت", slug: "oil" },
//   { name: "المشتقات النفطية", slug: "fuel" },
// ];
const cities = [
  { name: "صنعاء", slug: "صنعاء" },
  { name: "عدن", slug: "عدن" },
  { name: "تعز", slug: "تعز" },
  { name: "إب", slug: "إب" },
  { name: "الحديدة", slug: "الحديدة" },
  { name: "حضرموت", slug: "حضرموت" },
];

const categories = [
  { name: "الأرز", slug: "الأرز" },
  { name: "القمح", slug: "قمح" },
  { name: "الدقيق", slug: "دقيق" },
  { name: "السكر", slug: "سكر" },
  { name: "الزيوت", slug: "زيوت" },
];
export default function LinkFooter() {

  return (

        <div className="grid gap-8 text-lg sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr] lg:gap-12">
          <div>
            <h2 className="text-2xl font-semibold">أسعار المحافظات</h2>

            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-muted-foreground">
              {cities.map((city) => (
                <MainLink
                  key={city.slug}
                  href={`/city/${city.slug}`}
                  className=" w-fit hover:text-foreground hover:underline"
                >
                  أسعار {city.name}
                </MainLink>
              ))}
            </div>

            <MainLink
              href ="/cities"
              className="mt-4 text-xl text-muted-foreground inline-block font-medium w-fit hover:text-foreground hover:underline"
            >
              جميع المحافظات
            </MainLink>
          </div>

          {/* Categories */}
          <div>
            <h1 className="text-2xl font-semibold">
              أسعار المنتجات
            </h1>

            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-muted-foreground">
              {categories.map((category) => (
                <MainLink
                  key={category.slug}
                  href={`/product/${category.slug}`}
                  className="w-fit hover:text-foreground hover:underline"
                >
                  أسعار {category.name}
                </MainLink>
              ))}
            </div>

            <MainLink
              href="/categories"
              className="mt-4 text-xl text-muted-foreground inline-block font-medium w-fit hover:text-foreground hover:underline"
            >
              جميع الفئات
            </MainLink>
          </div>

        </div>
  );
}

