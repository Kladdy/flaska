import { DefaultCategory, EntryCategorys } from '@/models/category'
import { IEntry } from '@/models/entry.model'
import { formatCurrencySEK } from '@/utils/format'
import { classNames } from '@/utils/tools'
import { StarIcon, BuildingStorefrontIcon, ArrowRightIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  entrys: IEntry[]
}

const getEntrySubtitle = (entry: IEntry) => {
  const components : string[] = []
  entry.amount || entry.amount == 0 ? components.push(`${entry.amount} st`) : components.push('Okänd mängd')
  entry.location ? components.push(`${entry.location}`) : components.push('Okänd plats')
  entry.price || entry.price == 0 ? components.push(`${formatCurrencySEK(entry.price)}`) : components.push('Inget pris')
  entry.origin ? components.push(`${entry.origin}`) : null
  return components.join(' | ')
}

export const getSystembolagetLink = (entry: IEntry) => {
  const systembolagetLink = entry.links.find(x => x?.startsWith("systembolaget|"))
  if (systembolagetLink) return systembolagetLink.split('|')[1]
}

export const getVivinoLink = (entry: IEntry) => {
  const vivinoLink = entry.links.find(x => x?.startsWith("vivino|"))
  if (vivinoLink) return vivinoLink.split('|')[1]
}

export const getEntryCategory = (entry: IEntry) => {
  const entryCategory = EntryCategorys.find(x => x.name === entry.category)
  return entryCategory ? entryCategory : DefaultCategory
}

export const getPillColors = (entry: IEntry) => {
  const entryCategory = getEntryCategory(entry)
  const color = entryCategory.color
  switch (color) {
    case 'yellow':
      return "bg-yellow-50 text-yellow-700 ring-yellow-600/20"
    case 'green':
      return "bg-green-50 text-green-700 ring-green-600/20"
    case 'blue':
      return "bg-blue-50 text-blue-700 ring-blue-600/20"
    case 'pink':
      return "bg-pink-50 text-pink-700 ring-pink-600/20"
    case 'purple':
      return "bg-purple-50 text-purple-700 ring-purple-600/20"
    case 'red':
      return "bg-red-50 text-red-700 ring-red-600/20"
    case 'orange':
      return "bg-orange-50 text-orange-700 ring-orange-600/20"
    default: 
      return "bg-gray-50 text-gray-700 ring-gray-600/20"
  }
}


const EntryGridList = (props: Props) => {
  return (
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {props.entrys.map((entry) => (
        <li key={entry._id!.toString()} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow border-2 dark:bg-slate-800 dark:divide-gray-500 dark:border-gray-600">
          <Link 
            href={`/entry?id=${entry._id}`}
            className="hover:bg-gray-200 hover:rounded-t-lg flex w-full items-center justify-between space-x-6 p-6 dark:hover:bg-gray-700"
          >
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">{entry.name}</h3>
                {!!entry.category && (
                  // <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  <span className={classNames("inline-flex flex-shrink-0 items-center rounded-full px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset", getPillColors(entry))}>
                    {entry.category}
                  </span>
                )}
              </div>
              <p className="mt-1 truncate text-sm text-gray-500 dark:text-gray-300">{getEntrySubtitle(entry)}</p>
            </div>
            {/* <img className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" src={entry.imageSmall} alt="" /> */}
            <Image width={40} height={40} className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" src={getEntryCategory(entry).icon} alt="" />
          </Link>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200 dark:divide-gray-500">
              {!!getSystembolagetLink(entry) && (
                <div className="flex w-0 flex-1">
                  <a
                    href={getSystembolagetLink(entry)}
                    className="hover:bg-gray-200 relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900 dark:text-gray-100 dark:hover:bg-gray-700"
                  >
                    <BuildingStorefrontIcon className="h-5 w-5 text-gray-400 dark:text-gray-300" aria-hidden="true" />
                    Systembolaget
                  </a>
                </div>
              )}
              {!!getVivinoLink(entry) && (
                <div className="-ml-px flex w-0 flex-1">
                  <a
                    href={getVivinoLink(entry)}
                    className="hover:bg-gray-200 relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900 dark:text-gray-100 dark:hover:bg-gray-700"
                  >
                    <StarIcon className="h-5 w-5 text-gray-400 dark:text-gray-300" aria-hidden="true" />
                    Vivino
                  </a>
                </div>
              )}
              {!getSystembolagetLink(entry) && !getVivinoLink(entry) && (
                <div className="flex w-0 flex-1">
                  <Link 
                    href={`/entry?id=${entry._id}`}
                    className="hover:bg-gray-200 relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-b-lg border border-transparent py-4 text-sm font-semibold text-gray-900  dark:hover:bg-gray-700"
                  >
                    <ArrowRightIcon className="h-5 w-5 text-gray-400 dark:text-gray-300" aria-hidden="true" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default EntryGridList