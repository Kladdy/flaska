import { IEntry } from "@/models/entry.model";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { Dialog, Transition } from "@headlessui/react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import React, { ChangeEvent, Fragment, useEffect, useRef, useState } from "react";

interface Props {
  show: boolean;
  showModalAction: Function;
  handleSavedEntry: Function,
  user: UserProfile;
}

function EntryModal(props: Props) {
  const systembolagetPrefix: string = "systembolaget|";
  const vivinoPrefix: string = "vivino|"
  const cancelButtonRef = useRef(null);
  const dataEntry: IEntry = {
    name: "",
    userId: "",
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
  const [entry, setEntry] = useState<IEntry>(dataEntry);
  const [uploadedImageName, setUploadedImageName] = useState<String>("");  
  
  const handleLink1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const oldLinks:string[] = entry.links;

    let newLinks: string[] = Array.from(oldLinks);
    newLinks[0] = systembolagetPrefix + event.target.value;
    setEntry({...entry, links:newLinks});
  };

  const handleLink2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const oldLinks:string[] = entry.links;

    let newLinks: string[] = Array.from(oldLinks);
    newLinks[1] = vivinoPrefix + event.target.value;
    setEntry({...entry, links:newLinks});
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile: File | undefined = event.target.files?.[0];
    if (uploadedFile) {
      setUploadedImageName(uploadedFile.name);
      //Convert image to base64 string
      const reader: FileReader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // setEntry({...entry, imageSmall:base64String});
        // setEntry({...entry, imageSmall:base64String}); //TODO: add large image as well
      };
      reader.readAsDataURL(uploadedFile);
    }
  };

  const handleSaveEntry = async () => {
    sendNewEntryToServer();
    handleCloseModal();
  };

  const sendNewEntryToServer = async () => {
      const settings = {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...entry, userId: props.user.sub}),
      };
      const response = await fetch("/api/entry", settings);

      if (response.status === 200) {
        props.handleSavedEntry();
      }
  }

  const handleCloseModal = () => {
    props.showModalAction();
    setEntry(dataEntry)
  };

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      {/* MODAL */}
      <Transition.Root show={props.show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={() => props.showModalAction()}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-100"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-100"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    {/* ICON CAN GO HERE */}
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Ny flaska
                      </Dialog.Title>
                      <div className="mt-2">
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                          Namn
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Chardonnay.."
                            onChange={(e) => setEntry({...entry, name: e.target.value})}
                          />
                        </div>

                        <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                          Beskrivning
                        </label>
                        <div className="mt-2">
                          <textarea
                            rows={3}
                            name="description"
                            id="description"
                            className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            defaultValue={""}
                            onChange={(e) => setEntry({...entry, description: e.target.value})}
                          />
                        </div>

                        <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                          Kategori
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="category"
                            id="category"
                            className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Bubbel, Vin.."
                            onChange={(e) => setEntry({...entry, category: e.target.value})}
                          />
                        </div>

                        <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                          Antal
                        </label>
                        <div className="mt-2">
                          <input
                            type="number"
                            name="amount"
                            id="amount"
                            className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="4"
                            onChange={(e) => setEntry({...entry, amount: e.target.valueAsNumber})}
                          />
                        </div>

                        <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                          Plats
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="location"
                            id="location"
                            className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Vinkyl 3, hylla 2.."
                            onChange={(e) => setEntry({...entry, location: e.target.value})}
                          />
                        </div>

                        <label htmlFor="origin" className="block text-sm font-medium leading-6 text-gray-900">
                          Ursprung
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="origin"
                            id="origin"
                            className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Spanien.."
                            onChange={(e) => setEntry({...entry, origin: e.target.value})}
                          />
                        </div>

                        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                          Pris
                        </label>
                        <div className="mt-2">
                          <input
                            type="number"
                            name="price"
                            id="price"
                            className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="349"
                            onChange={(e) => setEntry({...entry, price: e.target.valueAsNumber})}
                          />
                        </div>

                        <label htmlFor="storage" className="block text-sm font-medium leading-6 text-gray-900">
                          Lagring
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="storage"
                            id="storage"
                            className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Varmt, kallt, mörkt etc.."
                            onChange={(e) => setEntry({...entry, storage: e.target.value})}
                          />
                        </div>

                        <label htmlFor="link1" className="block text-sm font-medium leading-6 text-gray-900">
                          Länk1
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="link1"
                            id="link1"
                            className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Systembolaget.."
                            onChange={handleLink1Change}
                          />
                        </div>

                        <label htmlFor="link2" className="block text-sm font-medium leading-6 text-gray-900">
                          Länk2
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="link2"
                            id="link2"
                            className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Sida.."
                            onChange={handleLink2Change}
                          />
                        </div>

                        <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                          Cover photo
                        </label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                          <div className="text-center">
                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                              >
                                <span>Ladda upp bild</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                  onChange={(e) => handleImageUpload(e)}
                                />
                              </label>
                              <p className="pl-1">eller drag och släpp här</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                            <p className="text-xs leading-5 text-green-600" id="uploadedImageName">
                              {uploadedImageName}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                      onClick={() => handleSaveEntry()}
                    >
                      Spara
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                      onClick={() => handleCloseModal()}
                      ref={cancelButtonRef}
                    >
                      Avbryt
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

export default EntryModal;
