import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { RegistrationModel } from '@/lib/RegistrationModel';


export const GET = async () => {
    try {
        await Connect();
        const registrations = await RegistrationModel.find({ isDeleted: false }).sort({ _id: 'desc' });
        return NextResponse.json(registrations);
    } catch (error) {
        console.error('GET Error:', error);
        return NextResponse.json({ message: 'Failed to fetch registrations' }, { status: 500 });
    }
}



export const POST = async (Request) => {
    try {
        await Connect();
        const { ptypes, user, unit, quarter, lernerid, regdt, nm, dob, gender, disability, nature, fmname, edn, marital, employment, religion, phonecat, mob } = await Request.json();
        const registrations = await RegistrationModel.create({ ptypes, user, unit, quarter, lernerid, regdt, nm, dob, gender, disability, nature, fmname, edn, marital, employment, religion, phonecat, mob });
        return NextResponse.json(registrations);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "POST Error", err }, { status: 500 });
    }
}