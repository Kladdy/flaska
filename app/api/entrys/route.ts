import { connectMongo } from '@/utils/mongodb';
import EntryModel from '@/models/entry.model';

export async function GET() {
  try {
    connectMongo();
    const entrys = EntryModel;
    
    const allEntrys = await entrys.find({});

    return Response.json(allEntrys)
  } catch (error) {
    console.error(error);
    return Response.error()
  }
}