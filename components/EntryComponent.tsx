import { IEntry } from "@/models/entry.model";
import { Fragment, useEffect, useRef, useState } from "react";
import EntryGridList, { getPillColors, getSystembolagetLink, getVivinoLink } from "./EntryGridList";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { Dialog, Transition } from "@headlessui/react";
import CheckIcon from "@heroicons/react/16/solid/CheckIcon";
import { PhotoIcon } from "@heroicons/react/24/solid";
import EntryModal from "./EntryModal";
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import TitleComponent from "./TitleComponent";
import { ArrowLeftIcon, BuildingStorefrontIcon, PaperClipIcon, PencilSquareIcon, StarIcon, TrashIcon } from '@heroicons/react/20/solid'
import Link from "next/link";
import { classNames } from "@/utils/tools";
import { formatCurrencySEK } from "@/utils/format";
import { LinkIcon } from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast"

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

  const router = useRouter()
  const [entry, setEntry] = useState<IEntry>(defaultEntry);
  const [showEntryModal, setShowEntryModal] = useState(false);
  const [entryToOverwriteWith, setEntryToOverwriteWith] = useState<IEntry | undefined>(undefined)
  const [reallyDelete, setReallyDelete] = useState(false);
  
  const showModalHandler = () => {
    setShowEntryModal(!showEntryModal);
    setEntryToOverwriteWith(undefined)
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

  const deleteEntry = async () => {
    const settings = {
      method: "DELETE",
    };
    const params = new URLSearchParams({
      id: entry._id!.toString() as string,
    })
    const res = await fetch(`/api/entry?${params.toString()}`, settings);
    
    if (res.status === 200) {
      toast.success("Flaskan raderades")
      router.push('/')
    } else {
      toast.error("Flaskan kunde inte raderas. Försök igen.")
    }
  }

  return (
    <>
      <EntryModal 
        show={showEntryModal} 
        showModalAction={showModalHandler} 
        handleSavedEntry={handleSavedEntry} 
        user={props.user} 
        entryToOverwriteWith={entryToOverwriteWith}
      />
    
      <div className="mx-auto max-w-5xl sm:px-6 lg:px-8 mb-10">
        <TitleComponent
          user={props.user}
        />

        <Link 
          href="/"
          className="flex flex-col items-center my-10"
        >
          <button
            type="button"
            className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <ArrowLeftIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Gå tillbaka
          </button>
        </Link>

        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="flex flex-row justify-between">
            <div className="px-4 py-6 sm:px-6">
              <h3 className="text-base font-semibold leading-7 text-gray-900">{entry.name}</h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Detaljer om denna flaska</p>
            </div>
            <div className="px-4 py-6 sm:px-6">
              <div className="flex sm:flex-row gap-x-2 gap-y-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  onClick={() => {
                    if (reallyDelete) {
                      deleteEntry()
                    } else {
                      setReallyDelete(true)
                      setTimeout(() => setReallyDelete(false), 4000)
                    }
                  }}
                >
                  <TrashIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                  {reallyDelete ? "Klicka igen för att radera" : "Radera flaska..."}
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => {
                    setEntryToOverwriteWith(entry)
                    setShowEntryModal(true)
                  }}
                >
                  <PencilSquareIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                  Redigera flaska
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Namn</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{entry.name}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Beskrivning</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{entry.description}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Kategori</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <span className={classNames("inline-flex flex-shrink-0 items-center rounded-full px-1.5 py-0.5 font-medium ring-1 ring-inset", getPillColors(entry))}>
                    {entry.category}
                  </span>
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Antal</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{entry.amount || entry.amount == 0 ? `${entry.amount} st` : 'Okänd mängd'}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Plats</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{entry.location}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Ursprung</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{entry.origin}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Pris</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{entry.price || entry.price == 0 ? `${formatCurrencySEK(entry.price)}` : 'Inget pris'}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Lagring</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{entry.storage}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Länk till Systembolaget</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {!!getSystembolagetLink(entry) && (
                    <a
                      href={getSystembolagetLink(entry)}
                      className="flex flex-row gap-x-1 rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      <LinkIcon className="h-5 w-5 pt-1 text-gray-400" aria-hidden="true" />
                      {getSystembolagetLink(entry)}
                    </a>
                  )}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Länk till Vivino</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {!!getVivinoLink(entry) && (
                    <a
                      href={getVivinoLink(entry)}
                      className="flex flex-row gap-x-1 rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      <LinkIcon className="h-5 w-5 pt-1 text-gray-400" aria-hidden="true" />
                      {getVivinoLink(entry)}
                    </a>
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexComponent;
