import {prisma} from '@/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

/**
 * GET API Route: Retrieves all inspector entries from the database.
 *
 * Route: GET /api/inspectors
 *
 */
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await prisma.inspector.findMany();

    return NextResponse.json(data, {status: 200, statusText: "OK"})
  } catch (error) {
    return NextResponse.json({message: error}, {status: 500, statusText: "Internal Error."})
  }
}


/**
 * POST API Route: Creates a new inspector entry in the database.
 *
 * Route: POST /api/inspector
 *
 * @param req - The Next.js API request object
 * @param res - The Next.js API response object
 */
export async function POST(req: Request, res: NextApiResponse){
  const body = await req.json()

  try {
    
    const {name} = body;
    // Ensure required fields are provided in the request body
    if (!name) {
      return NextResponse.json({message: "Required fields are missing in the request body."}, {status: 400, statusText: 'Required Fields Missing.'})
    }
    
    // Create a new inspection entry
    const newInspector = await prisma.inspector.create({
      data: body,
    });

    return NextResponse.json(newInspector, {status: 201, statusText: 'OK'})
  } catch (error) {
    return NextResponse.json({message: error}, {status: 500, statusText: 'Server Error.'})
  }
}