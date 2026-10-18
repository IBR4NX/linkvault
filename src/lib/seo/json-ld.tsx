interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}
export function JsonLd({ data }: JsonLdProps) {
  const jsonLd = JSON.stringify(data).replace(/</g, "\\u003c");
    return (
      <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
  );
}
export const JsonLdWebsite = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://ibovs.vercel.app/#organization",
      name: "دليلك اليمن",
      alternateName: [
        "أسعار اليمن اليوم",
        "أسعار المنتجات في اليمن",
        "أسعار السلع في اليمن",
        "دليل أسعار اليمن",
        "أسعار السوق اليمني",
      ],
      url: "https://ibovs.vercel.app/",
      description:
        "منصة لمتابعة أسعار المنتجات والسلع في اليمن ومقارنة الأسعار حسب المدينة والفئة.",
      logo: {
        "@type": "ImageObject",
        "@id": "https://ibovs.vercel.app/#logo",
        url: "https://ibovs.vercel.app/favicons/web-app-manifest-512x512.png",
        contentUrl:
          "https://ibovs.vercel.app/favicons/web-app-manifest-512x512.png",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://ibovs.vercel.app/#website",
      url: "https://ibovs.vercel.app/",
      name: "أسعار اليمن",
      alternateName: [
        "أسعار اليمن اليوم",
        "أسعار المنتجات في اليمن",
        "أسعار السلع في اليمن",
        "دليل أسعار اليمن",
        "أسعار السوق اليمني",
      ],
      description:
        "تعرف على أسعار المنتجات والسلع في اليمن اليوم، وقارن الأسعار حسب المدينة والفئة، وابحث عن سعر أي منتج في صنعاء أو تعز أو عدن من مكان واحد.",
      inLanguage: "ar",
      publisher: {
        "@id": "https://ibovs.vercel.app/#organization",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate:
            "https://ibovs.vercel.app/prices?search={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://ibovs.vercel.app/#webpage",
      url: "https://ibovs.vercel.app/",
      name: "أسعار اليمن اليوم للمنتجات والسلع",
      description:
        "تعرف على أسعار المنتجات والسلع في اليمن اليوم، وقارن الأسعار حسب المدينة والفئة، وابحث عن سعر أي منتج في صنعاء أو تعز أو عدن من مكان واحد.",
      isPartOf: {
        "@id": "https://ibovs.vercel.app/#website",
      },
      about: {
        "@id": "https://ibovs.vercel.app/#organization",
      },
      breadcrumb: {
        "@id": "https://ibovs.vercel.app/#breadcrumb",
      },
      inLanguage: "ar",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://ibovs.vercel.app/#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "الرئيسية",
          item: "https://ibovs.vercel.app/",
        },
      ],
    },
  ],
};
