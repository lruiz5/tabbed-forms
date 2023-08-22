import {prisma} from '@/db';
import { NextResponse } from 'next/server';


/**
 * GET API Route: Retrieves specified vehicle entry from the database.
 * - expects a valid, unique id
 *
 * Route: GET /api/vehicles/:id
 *
 */
export async function GET(req:Request, {params}: { params: {id: String}}) {
    const {id} = params;
    try {
        if (id) {
          const vehicleId = parseInt(id as string);
  
          const vehicle = await prisma.vehicle.findUnique({
            where: {
              id: vehicleId,
            },
          });
  
          if (!vehicle) {
            return NextResponse.json({message: "Vehicle Not Found."}, {status: 404, statusText: "Not Found"})
          }
  
          return NextResponse.json(vehicle, {status: 200, statusText: 'OK'})
          
        }} catch (error) {
            return NextResponse.json({message: "An error occurred while fetching data."}, {status: 500, statusText: 'Server Error.'})

          }
}

/**
 * DELETE API Route: Deletes a vehicle entry from the database based on a unique ID, returns the deleted item.
 *
 * Route: DELETE /api/vehicles/:id
 *
 */
export async function DELETE(req:Request, {params}: { params: {id: String}}){
    const {id} = params
    try {
        if (!id) {
          return NextResponse.json({message: "ID parameter is missing."}, {status: 400, statusText: "Missing Parameters"})
        }
  
        const vehicleId = parseInt(id as string);
  
        const existingVehicle = await prisma.vehicle.findUnique({
          where: {
            id: vehicleId,
          },
        });
  
        if (!existingVehicle) {
          return NextResponse.json({message: "Vehicle Not Found"}, {status: 404, statusText: "Not Found"})
        }
  
        const deletedVehicle = await prisma.vehicle.delete({
          where: {
            id: vehicleId,
          },
        });
  
        return NextResponse.json(deletedVehicle, {status: 200, statusText: "OK"})
        
      } catch (error) {
        return NextResponse.json({message: 'An error occurred while deleting the entry.'}, {status: 500, statusText: "Server Error"})
      }

    
}

/**
 * PATCH API Route: Updates a vehicle entry in the database based on a unique ID.
 *
 * Route: PATCH /api/vehicles/:id
 *
 */
export async function PATCH(req:Request, {params}: { params: {id: String}}){
    const {id} = params;
    const body = await req.json()

    try {
        if (!id) {
          return NextResponse.json({message: "ID parameter is missing."}, {status: 400, statusText: "Missing Parameters"})
        }
  
        const vehicleId = parseInt(id as string);
  
        // Check if the vehicle with the given ID exists
        const existingVehicle = await prisma.vehicle.findUnique({
          where: {
            id: vehicleId,
          },
        });
  
        if (!existingVehicle) {
          return NextResponse.json({message: "Vehicle not found."}, {status: 404, statusText: "Not Found."})
        }
  
        // Update the vehicle entry
       const updatedVehicle = await prisma.vehicle.update({
          where: {
            id: vehicleId,
          },
          data: body,
        });
  
        return NextResponse.json(updatedVehicle, {status: 200, statusText: "OK"})
      } catch (error) {
        return NextResponse.json({message: error}, {status: 500, statusText: "Internal Error."})
      }

    
}
