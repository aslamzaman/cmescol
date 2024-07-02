import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { RegistrationModel } from '@/lib/RegistrationModel';
    

// Soft deleted
export const PATCH = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const registrations = await RegistrationModel.findOneAndUpdate({_id: id, isDeleted: false},{isDeleted:true},{new:true});
    return NextResponse.json(registrations);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 500 });
  }
} 


// Update data
export const PUT = async (Request,{ params }) => {
  try {
    await Connect();
    const {id} = params;
    const { ptypes, user, unit, quarter, lernerid, regdt, nm, dob, gender, disability, nature, fmname, edn, marital, employment, religion, phonecat, mob } = await Request.json();
    const registrations = await RegistrationModel.findOneAndUpdate({ _id: id }, { ptypes, user, unit, quarter, lernerid, regdt, nm, dob, gender, disability, nature, fmname, edn, marital, employment, religion, phonecat, mob });
    return NextResponse.json(registrations);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


// Hard deleted
export const DELETE = async ( Request, { params }) => {
  try {
    await Connect();
    const {id} = params;
    const registrations = await RegistrationModel.findOneAndDelete({_id: id});
    return NextResponse.json(registrations);
  } catch (err) {
    return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
  }
} 