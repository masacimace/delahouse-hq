import type { StructureResolver } from "sanity/structure";

const hiddenDocumentTypes = [
  "siteSettings",
  "homePage",
  "brandsPage",
  "whatsOnPage",
  "aboutPage",
  "brand",
  "outlet",
  "whatsOn",
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("DELAHOUSE BACKEND")
    .items([
      S.listItem()
        .title("Website Settings")
        .child(
          S.list()
            .title("Website Settings")
            .items([
              S.documentTypeListItem("siteSettings").title("Site Settings"),
              S.documentTypeListItem("homePage").title("Homepage"),
              S.documentTypeListItem("brandsPage").title("Header Brands"),
              S.documentTypeListItem("whatsOnPage").title("Header WhatsOn"),
              S.documentTypeListItem("aboutPage").title("About Page"),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title("Content Manager")
        .child(
          S.list()
            .title("Content Manager")
            .items([
              S.documentTypeListItem("brand").title("Brand Directory"),
              S.documentTypeListItem("outlet").title("Store Locations"),
              S.documentTypeListItem("whatsOn").title("What's On Content"),
            ]),
        ),

      S.divider(),

      ...S.documentTypeListItems().filter((listItem) => {
        const id = listItem.getId();

        return id ? !hiddenDocumentTypes.includes(id) : true;
      }),
    ]);
