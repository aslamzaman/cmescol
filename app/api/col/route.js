import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { ColModel } from '@/lib/Models/ColModel';



export const POST = async (Request) => {
  try {
    await Connect();
    const { user, ip } = await Request.json();
    const cols = await ColModel.create({ user, ip });
    return NextResponse.json(cols);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}