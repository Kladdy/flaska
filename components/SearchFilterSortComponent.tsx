import { IEntry } from "@/models/entry.model";
import { getEntryCategory, getPillColors } from "./EntryGridList";
import { useEffect, useState } from "react";
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/20/solid'
import { classNames } from "@/utils/tools";

interface Props {
  entrys: IEntry[];
  setEntrys: (entrys: IEntry[]) => void;
}

interface Filter {
  value: string;
  label: string;
  checked: boolean;
}

interface Filters {
  category: Filter[];
  location: Filter[];
  price: Filter[];
  origin: Filter[];
}

const filters : Filters = {
  category: [
    { value: '0', label: '$0 - $25', checked: false },
    { value: '25', label: '$25 - $50', checked: false },
    { value: '50', label: '$50 - $75', checked: false },
    { value: '75', label: '$75+', checked: false },
  ],
  location: [
    { value: 'white', label: 'White', checked: false },
    { value: 'beige', label: 'Beige', checked: false },
    { value: 'blue', label: 'Blue', checked: true },
    { value: 'brown', label: 'Brown', checked: false },
    { value: 'green', label: 'Green', checked: false },
    { value: 'purple', label: 'Purple', checked: false },
  ],
  price: [
    { value: 'xs', label: 'XS', checked: false },
    { value: 's', label: 'S', checked: true },
    { value: 'm', label: 'M', checked: false },
    { value: 'l', label: 'L', checked: false },
    { value: 'xl', label: 'XL', checked: false },
    { value: '2xl', label: '2XL', checked: false },
  ],
  origin: [
    { value: 'all-new-arrivals', label: 'All New Arrivals', checked: false },
    { value: 'tees', label: 'Tees', checked: false },
    { value: 'objects', label: 'Objects', checked: false },
    { value: 'sweatshirts', label: 'Sweatshirts', checked: false },
    { value: 'pants-and-shorts', label: 'Pants & Shorts', checked: false },
  ],
}

interface SortOption {
  value: string;
  label: string;
  current: boolean;
}

interface SortOrder {
  value: string;
  label: string;
  current: boolean;
}

const SearchFilterSortComponent = (props: Props) => {
  const [search, setSearch] = useState("");
  // const [filters, setFilters] = useState<Filters>({
  //   category: [],
  //   location: [],
  //   price: [],
  //   origin: [],
  // });
  const [sortOptions, setSortOptions] = useState<SortOption[]>([
    { value: 'name', label: 'Namn', current: true },
    { value: 'category', label: 'Kategori', current: false },
    { value: 'amount', label: 'Antal', current: false },
    { value: 'location', label: 'Plats', current: false },
    { value: 'price', label: 'Pris', current: false },
    { value: 'origin', label: 'Ursprung', current: false },
  ]);
  const [sortOrders, setSortOrders] = useState<SortOrder[]>([
    { value: 'ASC', label: 'Stigande', current: true },
    { value: 'DESC', label: 'Fallande', current: false },
  ]);

  const getAmountOfFilters = () => {
    let amount = 0;
    Object.keys(filters).forEach((key) => {
      amount += filters[key as keyof Filters].filter((filter) => filter.checked).length;
    });
    return amount;
  }

  // Update list on sort change
  useEffect(() => {
    const sortOption = sortOptions.find((option) => option.current);
    const sortOrder = sortOrders.find((order) => order.current);
    if (sortOption && sortOrder) {
      const sortedEntrys = [...props.entrys].sort((a, b) => {
        if (sortOption.value === 'name') {
          if (sortOrder.value === 'ASC') {
            return a.name.localeCompare(b.name);
          }
          return b.name.localeCompare(a.name);
        }
        if (sortOption.value === 'category') {
          if (sortOrder.value === 'ASC') {
            return a.category.localeCompare(b.category);
          }
          return b.category.localeCompare(a.category);
        }
        if (sortOption.value === 'amount') {
          if (sortOrder.value === 'ASC') {
            return a.amount - b.amount;
          }
          return b.amount - a.amount;
        }
        if (sortOption.value === 'location') {
          if (sortOrder.value === 'ASC') {
            return a.location.localeCompare(b.location);
          }
          return b.location.localeCompare(a.location);
        }
        if (sortOption.value === 'price') {
          if (sortOrder.value === 'ASC') {
            return a.price - b.price;
          }
          return b.price - a.price;
        }
        if (sortOption.value === 'origin') {
          if (sortOrder.value === 'ASC') {
            return a.origin.localeCompare(b.origin);
          }
          return b.origin.localeCompare(a.origin);
        }
        return 0;
      });
      props.setEntrys(sortedEntrys);
    }
  }, [sortOptions, sortOrders]);
  
  return (
    <div className="mt-4 mb-10">
      {/* Filters */}
      <Disclosure
        as="section"
        aria-labelledby="filter-heading"
        className="grid items-center border-b border-t border-gray-200"
      >
        <h2 id="filter-heading" className="sr-only">
          Filter
        </h2>
        <div className="relative col-start-1 row-start-1 py-4">
          <div className="mx-auto flex max-w-7xl space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
            <div>
              <Disclosure.Button className="group flex items-center font-medium text-gray-700 dark:text-gray-300">
                <FunnelIcon
                  className="mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500 dark:text-gray-200 dark:group-hover:text-gray-300 "
                  aria-hidden="true"
                />
                {getAmountOfFilters()} filter
              </Disclosure.Button>
            </div>
            <div className="pl-6">
              <button type="button" className="text-gray-500 dark:text-gray-400">
                Rensa filter
              </button>
            </div>
          </div>
        </div>
        <Disclosure.Panel className="border-t border-gray-200 py-10">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
            <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
              <fieldset>
                <legend className="block font-medium">Kategori</legend>
                <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                  {filters.category.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center text-base sm:text-sm">
                      <input
                        id={`category-${optionIdx}`}
                        name="category[]"
                        defaultValue={option.value}
                        type="checkbox"
                        className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        defaultChecked={option.checked}
                      />
                      <label htmlFor={`category-${optionIdx}`} className="ml-3 min-w-0 flex-1 text-gray-600 dark:text-gray-200">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="block font-medium">Plats</legend>
                <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                  {filters.location.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center text-base sm:text-sm">
                      <input
                        id={`location-${optionIdx}`}
                        name="location[]"
                        defaultValue={option.value}
                        type="checkbox"
                        className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        defaultChecked={option.checked}
                      />
                      <label htmlFor={`location-${optionIdx}`} className="ml-3 min-w-0 flex-1 text-gray-600 dark:text-gray-200">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
            <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
              <fieldset>
                <legend className="block font-medium">Pris</legend>
                <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                  {filters.price.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center text-base sm:text-sm">
                      <input
                        id={`price-${optionIdx}`}
                        name="price[]"
                        defaultValue={option.value}
                        type="checkbox"
                        className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        defaultChecked={option.checked}
                      />
                      <label htmlFor={`price-${optionIdx}`} className="ml-3 min-w-0 flex-1 text-gray-600 dark:text-gray-200">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="block font-medium">Ursprung</legend>
                <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                  {filters.origin.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center text-base sm:text-sm">
                      <input
                        id={`origin-${optionIdx}`}
                        name="origin[]"
                        defaultValue={option.value}
                        type="checkbox"
                        className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        defaultChecked={option.checked}
                      />
                      <label htmlFor={`origin-${optionIdx}`} className="ml-3 min-w-0 flex-1 text-gray-600 dark:text-gray-200">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>
        </Disclosure.Panel>
        <div className="sm:col-start-1 sm:row-start-1 py-4">
          <div className="mx-auto flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8">
            <div className="mr-8 text-sm font-medium text-gray-700 dark:text-gray-200">
              Sortering
            </div>

            <Menu as="div" className="relative inline-block">
              <div className="flex">
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-400">
                  {sortOptions.find((option) => option.current)?.label}
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500 dark:text-gray-200 dark:group-hover:text-gray-400"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white dark:bg-slate-800 shadow-2xl ring-1 ring-black dark:ring-slate-600 ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.value}>
                        {({ active }) => (
                          <div
                            className={classNames(
                              option.current ? 'font-medium text-gray-900 dark:text-gray-200' : 'text-gray-500 dark:text-gray-500',
                              active ? 'bg-gray-100 dark:bg-gray-700' : '',
                              'block px-4 py-2 text-sm hover:cursor-pointer'
                            )}
                            onClick={() => {
                              setSortOptions(sortOptions.map((sortOption) => {
                                if (sortOption.value === option.value) {
                                  return {
                                    ...sortOption,
                                    current: true,
                                  }
                                }
                                return {
                                  ...sortOption,
                                  current: false,
                                }
                              }));
                            }}
                          >
                            {option.label}
                          </div>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <Menu as="div" className="relative inline-block ml-4">
              <div className="flex">
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-400">
                  {sortOrders.find((sortOrder) => sortOrder.current)?.label}
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500 dark:text-gray-200 dark:group-hover:text-gray-400"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white dark:bg-slate-800 shadow-2xl ring-1 ring-black dark:ring-slate-600 ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOrders.map((option) => (
                      <Menu.Item key={option.value}>
                        {({ active }) => (
                          <div
                            className={classNames(
                              option.current ? 'font-medium text-gray-900 dark:text-gray-200' : 'text-gray-500 dark:text-gray-500',
                              active ? 'bg-gray-100 dark:bg-gray-700' : '',
                              'block px-4 py-2 text-sm hover:cursor-pointer'
                            )}
                            onClick={() => {
                              setSortOrders(sortOrders.map((sortOrder) => {
                                if (sortOrder.value === option.value) {
                                  return {
                                    ...sortOrder,
                                    current: true,
                                  }
                                }
                                return {
                                  ...sortOrder,
                                  current: false,
                                }
                              }));
                            }}
                          >
                            {option.label}
                          </div>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </Disclosure>
    </div>
  );
}

export default SearchFilterSortComponent;