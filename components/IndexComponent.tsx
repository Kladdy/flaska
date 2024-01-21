import { IEntry } from "@/models/entry.model";
import { Fragment, useEffect, useRef, useState } from "react";
import EntryGridList from "./EntryGridList";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { Dialog, Transition } from "@headlessui/react";
import CheckIcon from "@heroicons/react/16/solid/CheckIcon";
import { PhotoIcon } from "@heroicons/react/24/solid";
import EntryModal from "./EntryModal";
import Link from "next/link";
import TitleComponent from "./TitleComponent";
import { PlusIcon } from "@heroicons/react/20/solid";
import LoadingDots from "./LoadingDots";
import SearchFilterSortComponent from "./SearchFilterSortComponent";

interface Props {
  user: UserProfile;
}

const IndexComponent = (props: Props) => {
  const [entrys, setEntrys] = useState<IEntry[]>([]);
  const [filteredEntrys, setFilteredEntrys] = useState<IEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEntryModal, setShowEntryModal] = useState(false);
  
  const showModalHandler = () => {
    setShowEntryModal(!showEntryModal);
  }
  const handleSavedEntry = () => {
    setLoading(true);
    fetchData();
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("/api/entrys");
    const data: IEntry[] = await res.json();
    setEntrys(data);
    setLoading(false);
  };

  useEffect(() => {
    setFilteredEntrys(entrys);
  }, [entrys]);

  return (
    <>
      <EntryModal show={showEntryModal} showModalAction={showModalHandler} handleSavedEntry={handleSavedEntry} user={props.user} />
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mb-10">
        <TitleComponent
          user={props.user}
        />

        <div className="flex flex-col items-center my-10">
          <button
            type="button"
            className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => setShowEntryModal(true)}
          >
            <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Lägg till flaska
          </button>
        </div>

        {loading ? 
        (
          <div className="my-28">
            <LoadingDots/>
          </div>
        ) : (
          <div>
            <SearchFilterSortComponent entrys={entrys} filteredEntrys={filteredEntrys} setFilteredEntrys={setFilteredEntrys} />
            <EntryGridList entrys={filteredEntrys} />
          </div>
        )}

      </div>
    </>
  );
};

export default IndexComponent;
