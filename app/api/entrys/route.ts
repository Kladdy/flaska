import { connectMongo } from '@/utils/mongodb';
import EntryModel, { IEntry } from '@/models/entry.model';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { NextResponse } from "next/server";

export const GET = withApiAuthRequired(async function myApiRoute(req) {
  const res = new NextResponse();
  const session = await getSession(req, res)!;
  if (!session) return Response.error();
  
  try {
    connectMongo();
    const allEntrys : IEntry[] = await EntryModel.find({ userId: session.user.sub });
    return Response.json(allEntrys)
  } catch (error) {
    console.error(error);
    return Response.error()
  }
});