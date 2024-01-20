import { connectMongo } from '@/utils/mongodb';
import EntryModel, { IEntry } from '@/models/entry.model';
import { NextRequest, NextResponse } from "next/server";
import mongoose from 'mongoose';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export const GET = withApiAuthRequired(async function myApiRoute(req: NextRequest) {
  const res = new NextResponse();
  const session = await getSession(req, res)!;
  if (!session) return Response.error();

  const id = req.nextUrl.searchParams.get("id");
  try {
    connectMongo();
    const entry : IEntry | null = await EntryModel.findById(id);
    if (entry?.userId !== session.user.sub) new Response(JSON.stringify("Not found"), { status: 404 });
    return Response.json(entry);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), { status: 500, statusText: 'Internal Server Error' });
  }
});

export const PUT = withApiAuthRequired(async function myApiRoute(req: NextRequest) {
  const res = new NextResponse();
  const session = await getSession(req, res)!;
  if (!session) return Response.error();

  const data = await req.json() as IEntry;
  let id = data._id?.toString()

  // If no id is provided, create a new id
  if (!id) id = new mongoose.Types.ObjectId().toString();

  try {
    connectMongo();
    // Find the entry first, and make sure it belongs to the user
    const entry : IEntry | null = await EntryModel.findById(id);
    if (entry?.userId !== session.user.sub) new Response(JSON.stringify("Not found"), { status: 404 });

    const updatedEntry : IEntry = await EntryModel.findOneAndUpdate({ _id: id }, data, { new: true, upsert: true });
    return Response.json(updatedEntry);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), { status: 500, statusText: 'Internal Server Error' });
  }
});

export const DELETE = withApiAuthRequired(async function myApiRoute(req: NextRequest) {
  const res = new NextResponse();
  const session = await getSession(req, res)!;
  if (!session) return Response.error();

  const id = req.nextUrl.searchParams.get("id");
  try {
    connectMongo();
    
    // Find the entry first, and make sure it belongs to the user
    const entry : IEntry | null = await EntryModel.findById(id);
    if (entry?.userId !== session.user.sub) new Response(JSON.stringify("Not found"), { status: 404 });

    await EntryModel.findByIdAndDelete(id);
    return new Response(null, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), { status: 500, statusText: 'Internal Server Error' });
  }
});