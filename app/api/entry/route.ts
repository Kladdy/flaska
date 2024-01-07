import { connectMongo } from '@/utils/mongodb';
import EntryModel, { IEntry } from '@/models/entry.model';
import { NextRequest } from "next/server";
import mongoose from 'mongoose';

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  try {
    connectMongo();
    const entry : IEntry | null = await EntryModel.findById(id);
    return Response.json(entry);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), { status: 500, statusText: 'Internal Server Error' });
  }
}

export async function PUT(request: NextRequest) {
  const data = await request.json() as IEntry;
  let id = data._id?.toString()

  // If no id is provided, create a new id
  if (!id) id = new mongoose.Types.ObjectId().toString();

  try {
    connectMongo();
    const updatedEntry : IEntry = await EntryModel.findOneAndUpdate({ _id: id }, data, { new: true, upsert: true });
    return Response.json(updatedEntry);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), { status: 500, statusText: 'Internal Server Error' });
  }
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  try {
    connectMongo();
    await EntryModel.findByIdAndDelete(id);
    return new Response(null, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), { status: 500, statusText: 'Internal Server Error' });
  }
}