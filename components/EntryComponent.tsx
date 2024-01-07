import { IEntry } from "@/models/entry.model";
import { Fragment, useEffect, useRef, useState } from "react";
import EntryGridList from "./EntryGridList";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { Dialog, Transition } from "@headlessui/react";
import CheckIcon from "@heroicons/react/16/solid/CheckIcon";
import { PhotoIcon } from "@heroicons/react/24/solid";
import EntryModal from "./EntryModal";
import { useSearchParams } from 'next/navigation'
import TitleComponent from "./TitleComponent";

export const defaultEntry : IEntry = {
  name: "",
  description: "",
  category: "",
  amount: 0,
  location: "",
  origin: "",
  price: 0,
  storage: "",
  links: [],
  imageSmall: "",
  imageLarge: ""
}

interface Props {
  user: UserProfile;
}

const IndexComponent = (props: Props) => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const [entry, setEntry] = useState<IEntry>(defaultEntry);
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
    const params = new URLSearchParams({
      id: id as string,
    })
    const res = await fetch(`/api/entry?${params.toString()}`);
    const data: IEntry = await res.json();
    setEntry(data);
  };

  return (
    <>
      <EntryModal show={showEntryModal} showModalAction={showModalHandler} handleSavedEntry={handleSavedEntry} user={props.user} />
    
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <TitleComponent
          user={props.user}
        />

        {/* <EntryGridList entrys={entrys} /> */}
      </div>
    </>
  );
};

export default IndexComponent;
