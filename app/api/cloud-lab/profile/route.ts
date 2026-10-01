export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BLOB_URL =
  "https://stteoportfoliolab01.blob.core.windows.net/portfolio-assets/profile.png";

export async function GET() {
  try {
    const identityEndpoint = process.env.IDENTITY_ENDPOINT;
    const identityHeader = process.env.IDENTITY_HEADER;

    if (!identityEndpoint || !identityHeader) {
      return Response.json(
        {
          error: "Identité managée Azure indisponible",
          environment: "Cette route doit être exécutée dans Azure Container Apps",
        },
        { status: 503 },
      );
    }

    const tokenEndpoint = new URL(identityEndpoint);

    tokenEndpoint.searchParams.set(
      "resource",
      "https://storage.azure.com/",
    );
    tokenEndpoint.searchParams.set("api-version", "2019-08-01");

    const tokenResponse = await fetch(tokenEndpoint, {
      headers: {
        "X-IDENTITY-HEADER": identityHeader,
      },
      cache: "no-store",
    });

    if (!tokenResponse.ok) {
      throw new Error(
        `Échec de l'authentification Azure : HTTP ${tokenResponse.status}`,
      );
    }

    const tokenData = (await tokenResponse.json()) as {
      access_token?: string;
    };

    if (!tokenData.access_token) {
      throw new Error("Azure n'a renvoyé aucun jeton d'accès");
    }

    const blobResponse = await fetch(BLOB_URL, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        "x-ms-version": "2023-11-03",
      },
      cache: "no-store",
    });

    if (!blobResponse.ok) {
      throw new Error(
        `Échec de la lecture du blob : HTTP ${blobResponse.status}`,
      );
    }

    return new Response(blobResponse.body, {
      status: 200,
      headers: {
        "Content-Type":
          blobResponse.headers.get("content-type") ?? "image/png",
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    console.error("Lecture du blob Azure impossible", error);

    return Response.json(
      { error: "Lecture du fichier Azure impossible" },
      { status: 500 },
    );
  }
}