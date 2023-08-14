import {prisma} from '@/db';
import { NextResponse } from 'next/server';


/**
 * GET API Route: Retrieves specified inspector entry from the database.
 * - expects a valid, unique id
 *
 * Route: GET /api/inspectors/:id
 *
 */
export async function GET(req:Request, {params}: { params: {id: String}}) {
    const {id} = params;
    try {
        if (id) {
          const inspectorId = parseInt(id as string);
  
          const inspector = await prisma.inspector.findUnique({
            where: {
              id: inspectorId,
            },
          });
  
          if (!inspector) {
            return NextResponse.json({message: "Inspector Not Found."}, {status: 404, statusText: "Not Found"})
          }
  
          return NextResponse.json(inspector, {status: 200, statusText: 'OK'})
          
        }} catch (error) {
            return NextResponse.json({message: "An error occurred while fetching data."}, {status: 500, statusText: 'Server Error.'})

          }
}

/**
 * DELETE API Route: **SOFT** Deletes a inspector entry from the database based on a unique ID, returns the deleted item.
 * 
 * Inspectors do not get "Deleted" permenantly, just marked as 'inactive'
 *
 * Route: DELETE /api/inspectors/:id
 *
 */
export async function DELETE(req:Request, {params}: { params: {id: String}}){
    const {id} = params
    try {
        if (!id) {
          return NextResponse.json({message: "ID parameter is missing."}, {status: 400, statusText: "Missing Parameters"})
        }
  
        const inspectorId = parseInt(id as string);
  
        const existingInspector = await prisma.inspector.findUnique({
          where: {
            id: inspectorId,
          },
        });
  
        if (!existingInspector) {
          return NextResponse.json({message: "Inspector Not Found"}, {status: 404, statusText: "Not Found"})
        }
  
        // Update the inspector entry to 'inactive'
       const deletedInspector = await prisma.inspector.update({
        where: {
          id: inspectorId,
        },
        data: {
            active: false
        },
      });
  
        return NextResponse.json(deletedInspector, {status: 200, statusText: "OK"})
        
      } catch (error) {
        console.log(error)
        return NextResponse.json({message: 'An error occurred while deleting the entry.'}, {status: 500, statusText: "Server Error"})
      }

    
}

/**
 * PATCH API Route: Updates a inspector entry in the database based on a unique ID.
 *
 * Route: PATCH /api/inspectors/:id
 *
 */
export async function PATCH(req:Request, {params}: { params: {id: String}}){
    const {id} = params;
    const body = await req.json()

    try {
        if (!id) {
          return NextResponse.json({message: "ID parameter is missing."}, {status: 400, statusText: "Missing Parameters"})
        }
  
        const inspectorId = parseInt(id as string);
  
        // Check if the inspector with the given ID exists
        const existingInspector = await prisma.inspector.findUnique({
          where: {
            id: inspectorId,
          },
        });
  
        if (!existingInspector) {
          return NextResponse.json({message: "Inspector not found."}, {status: 404, statusText: "Not Found."})
        }
  
        // Update the inspector entry
       const updatedInspector = await prisma.inspector.update({
          where: {
            id: inspectorId,
          },
          data: body,
        });
  
        return NextResponse.json(updatedInspector, {status: 200, statusText: "OK"})
      } catch (error) {
        return NextResponse.json({message: error}, {status: 500, statusText: "Internal Error."})
      }

    
}
