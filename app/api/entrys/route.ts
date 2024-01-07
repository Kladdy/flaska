import { connectMongo } from '@/utils/mongodb';
import EntryModel, { IEntry } from '@/models/entry.model';

export async function GET() {
  try {
    connectMongo();
    const allEntrys : IEntry[] = await EntryModel.find();
    return Response.json(allEntrys)
  } catch (error) {
    console.error(error);
    return Response.error()
  }
}