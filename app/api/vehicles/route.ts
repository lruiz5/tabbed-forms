import { prisma } from "@/db";
import { NextResponse, NextRequest } from "next/server";

/**
 * GET API Route: Retrieves all vehicle entries from the database.
 *
 * Route: GET /api/vehicles
 *
 */
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const data = await prisma.vehicle.findMany();

    return new Response(JSON.stringify(data), {
      status: 200,
      statusText: "OK",
    });
  } catch (error) {
    return new Response("An error occurred while fetching data.", {
      status: 500,
      statusText: "Server Error",
    });
  }
}

/**
 * POST API Route: Creates a new vehicle entry in the database.
 *
 * Route: POST /api/vehicles
 *
 * @param req - The Next.js API request object
 * @param res - The Next.js API response object
 */
export async function POST(req: Request, res: NextResponse) {
  const body = await req.json();

  try {
    const { unitNum, licenseNum } = body;
    // Ensure required fields are provided in the request body
    if (!unitNum || !licenseNum) {
      return NextResponse.json(
        { message: "Required fields are missing in the request body." },
        { status: 400, statusText: "Required Fields Missing." }
      );
    }

    // Create a new vehicle entry
    const newVehicle = await prisma.vehicle.create({
      data: body,
    });

    return NextResponse.json(newVehicle, { status: 201, statusText: "OK" });
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: 500, statusText: "Server Error." }
    );
  }
}
