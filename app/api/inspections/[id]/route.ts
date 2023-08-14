import {prisma} from '@/db';
import { NextResponse } from 'next/server';


/**
 * GET API Route: Retrieves specified inspection entry from the database.
 * - expects a valid, unique id
 *
 * Route: GET /api/inspections/:id
 *
 */
export async function GET(req:Request, {params}: { params: {id: String}}) {
    const {id} = params;
    try {
        if (id) {
          const inspectionId = parseInt(id as string);
  
          const inspection = await prisma.inspection.findUnique({
            where: {
              id: inspectionId,
            },
          });
  
          if (!inspection) {
            return NextResponse.json({message: "Inspection Not Found."}, {status: 404, statusText: "Not Found"})
          }
  
          return NextResponse.json(inspection, {status: 200, statusText: 'OK'})
          
        }} catch (error) {
            return NextResponse.json({message: "An error occurred while fetching data."}, {status: 500, statusText: 'Server Error.'})

          }
}

/**
 * DELETE API Route: Deletes a inspection entry from the database based on a unique ID, returns the deleted item.
 *
 * Route: DELETE /api/inspections/:id
 *
 */
export async function DELETE(req:Request, {params}: { params: {id: String}}){
    const {id} = params
    try {
        if (!id) {
          return NextResponse.json({message: "ID parameter is missing."}, {status: 400, statusText: "Missing Parameters"})
        }
  
        const inspectionId = parseInt(id as string);
  
        const existingInspection = await prisma.inspection.findUnique({
          where: {
            id: inspectionId,
          },
        });
  
        if (!existingInspection) {
          return NextResponse.json({message: "Inspection Not Found"}, {status: 404, statusText: "Not Found"})
        }
  
        const deletedInspection = await prisma.inspection.delete({
          where: {
            id: inspectionId,
          },
        });
  
        return NextResponse.json(deletedInspection, {status: 200, statusText: "OK"})
        
      } catch (error) {
        return NextResponse.json({message: 'An error occurred while deleting the entry.'}, {status: 500, statusText: "Server Error"})
      }

    
}

/**
 * PATCH API Route: Updates a inspection entry in the database based on a unique ID.
 *
 * Route: PATCH /api/inspections/:id
 *
 */
export async function PATCH(req:Request, {params}: { params: {id: String}}){
    const {id} = params;
    const body = await req.json()

    try {
        if (!id) {
          return NextResponse.json({message: "ID parameter is missing."}, {status: 400, statusText: "Missing Parameters"})
        }
  
        const inspectionId = parseInt(id as string);
  
        // Check if the inspection with the given ID exists
        const existingInspection = await prisma.inspection.findUnique({
          where: {
            id: inspectionId,
          },
        });
  
        if (!existingInspection) {
          return NextResponse.json({message: "Inspection not found."}, {status: 404, statusText: "Not Found."})
        }
  
        // Update the inspection entry
       const updatedInspection = await prisma.inspection.update({
          where: {
            id: inspectionId,
          },
          data: body,
        });
  
        return NextResponse.json(updatedInspection, {status: 200, statusText: "OK"})
      } catch (error) {
        return NextResponse.json({message: error}, {status: 500, statusText: "Internal Error."})
      }

    
}
