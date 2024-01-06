import { IEntry } from "@/models/entry.model";
import { useEffect, useState } from "react";
import EntryGridList from "./EntryGridList";
import { UserProfile } from "@auth0/nextjs-auth0/client";

interface Props {
  user: UserProfile;
}

const IndexComponent = (props: Props) => {
  const [entrys, setEntrys] = useState<IEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/entrys');
      const data : IEntry[] = await res.json();
      setEntrys(data);
    }
    fetchData();
  }, [])

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="flex flex-col items-center my-10">
        <p className="">Welcome {props.user.name}!</p>
        <a href="/api/auth/logout">Logout</a>
      </div>
      <EntryGridList
        entrys={entrys}
      />
    </div>
  )
}

export default IndexComponent