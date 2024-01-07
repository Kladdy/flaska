import { IEntry } from "@/models/entry.model";
import { Fragment, useEffect, useRef, useState } from "react";
import EntryGridList from "./EntryGridList";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { Dialog, Transition } from "@headlessui/react";
import CheckIcon from "@heroicons/react/16/solid/CheckIcon";
import { PhotoIcon } from "@heroicons/react/24/solid";
import EntryModal from "./EntryModal";

interface Props {
  user: UserProfile;
}

const IndexComponent = (props: Props) => {
  const [entrys, setEntrys] = useState<IEntry[]>([]);
  const [showEntryModal, setShowEntryModal] = useState(false);
  
  const showModalHandler = () => {
    setShowEntryModal(!showEntryModal);
  }
  const handleSavedEntry = () => {
    fetchData();
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("/api/entrys");
    const data: IEntry[] = await res.json();
    setEntrys(data);
  };

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="flex flex-col items-center my-10">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          flaska
        </h1>
        <h3 className="flex flex-col items-center text-l font-semibold mt-5">
          <p className="">Välkommen, {props.user.name}!</p>
          <a className="hover:underline" href="/api/auth/logout">Logga ut</a>
        </h3>
      </div>

      <div className="flex flex-col items-center my-10">
        <button
          type="button"
          className="rounded bg-indigo-500 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          onClick={() => setShowEntryModal(true)}
        >
          Lägg till flaska
        </button>
        <EntryModal show={showEntryModal} showModalAction={showModalHandler} handleSavedEntry={handleSavedEntry} user={props.user} />
      </div>

      <EntryGridList entrys={entrys} />
    </div>
  );
};

export default IndexComponent;
