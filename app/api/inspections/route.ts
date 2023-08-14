import { prisma } from "@/db";
import { NextResponse, NextRequest } from "next/server";

/**
 * GET API Route: Retrieves all inspection entries from the database.
 *
 * Route: GET /api/inspections
 *
 */
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const data = await prisma.inspection.findMany();

    return NextResponse.json(data, { status: 200, statusText: "OK" });
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: 500, statusText: "Internal Error." }
    );
  }
}

/**
 * POST API Route: Creates a new inspection entry in the database.
 *
 * Route: POST /api/inspections
 *
 * @param req - The Next.js API request object
 * @param res - The Next.js API response object
 */

export async function POST(req: Request, res: NextResponse) {
  // Constants for allowed values
  const inspectionAllowedValues: string[] = ["OK", "DEF", ""];

  // Validation function
  function isValidValue(value: string, allowedValues: string[]): boolean {
    return allowedValues.includes(value);
  }

  const body = await req.json();
  try {
    const { inspectorId, vehicleId } = body;
    // Ensure required fields are provided in the request body
    if (!inspectorId || !vehicleId) {
      return NextResponse.json(
        { message: "Required fields are missing in the request body." },
        { status: 400, statusText: "Required Fields Missing." }
      );
    }
    /* if (!isValidValue(body.fireExtinguisher, inspectionAllowedValues)) {
      return NextResponse.json({message: `Invalid value: ${body.fireExtinguisher}`}, {status: 401, statusText: "Invalid value."});
    } */

    //parseInt for all int values
    body.inspectorId = parseInt(inspectorId);
    body.vehicleId = parseInt(vehicleId);

    console.log(body);
    // Create a new inspection entry
    const newInspection = await prisma.inspection.create({
      data: body,
    });

    return NextResponse.json(newInspection, { status: 201, statusText: "OK" });
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: 500, statusText: "Server Error." }
    );
  }
}
