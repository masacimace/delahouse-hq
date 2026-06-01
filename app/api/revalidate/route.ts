import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type RevalidatePayload = {
  _type?: string;
  slug?: string;
  brandSlug?: string;
  path?: string;
  paths?: string[];
};

function getFallbackPaths(body: RevalidatePayload) {
  const paths = new Set<string>();

  switch (body._type) {
    case "siteSettings":
      paths.add("/");
      paths.add("/brands");
      paths.add("/whats-on");
      paths.add("/about");
      paths.add("/sitemap.xml");
      break;

    case "homePage":
      paths.add("/");
      break;

    case "brandsPage":
      paths.add("/brands");
      break;

    case "whatsOnPage":
      paths.add("/whats-on");
      break;

    case "aboutPage":
      paths.add("/about");
      break;

    case "brand":
      paths.add("/");
      paths.add("/brands");
      paths.add("/sitemap.xml");

      if (body.slug) {
        paths.add(`/brands/${body.slug}`);
      }

      break;

    case "outlet":
      if (body.brandSlug) {
        paths.add(`/brands/${body.brandSlug}`);
      }

      break;

    case "whatsOn":
      paths.add("/");
      paths.add("/whats-on");
      paths.add("/sitemap.xml");
      break;

    default:
      paths.add("/");
      break;
  }

  return Array.from(paths);
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json(
        {
          message: "Missing environment variable SANITY_REVALIDATE_SECRET",
        },
        { status: 500 },
      );
    }

    const { isValidSignature, body } = await parseBody<RevalidatePayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
      true,
    );

    if (!isValidSignature) {
      return NextResponse.json(
        {
          message: "Invalid signature",
        },
        { status: 401 },
      );
    }

    const paths = body?.paths?.length
      ? body.paths
      : body?.path
        ? [body.path]
        : getFallbackPaths(body || {});

    const uniquePaths = Array.from(
      new Set(
        paths.filter(
          (path) => typeof path === "string" && path.startsWith("/"),
        ),
      ),
    );

    uniquePaths.forEach((path) => {
      revalidatePath(path);
    });

    return NextResponse.json({
      revalidated: true,
      paths: uniquePaths,
      body,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Revalidation failed",
      },
      { status: 500 },
    );
  }
}
