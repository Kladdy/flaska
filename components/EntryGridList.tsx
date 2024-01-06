import { IEntry } from '@/models/entry.model'
import { formatCurrencySEK } from '@/utils/format'
import { StarIcon, BuildingStorefrontIcon } from '@heroicons/react/20/solid'

interface Props {
  entrys: IEntry[]
}

const getEntrySubtitle = (entry: IEntry) => {
  const components : string[] = []
  entry.amount ? components.push(`${entry.amount} st`) : components.push('Okänd mängd')
  entry.location ? components.push(`${entry.location}`) : components.push('Okänd plats')
  entry.price ? components.push(`${formatCurrencySEK(entry.price)}`) : components.push('Inget pris')
  entry.origin ? components.push(`${entry.origin}`) : null
  return components.join(' | ')
}

const getSystembolagetLink = (entry: IEntry) => {
  const systembolagetLink = entry.links.find(x => x.startsWith("systembolaget|"))
  if (systembolagetLink) return systembolagetLink.split('|')[1]
}

const getVivinoLink = (entry: IEntry) => {
  const vivinoLink = entry.links.find(x => x.startsWith("vivino|"))
  if (vivinoLink) return vivinoLink.split('|')[1]
}

const EntryGridList = (props: Props) => {
  return (
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {props.entrys.map((entry) => (
        <li key={entry._id!.toString()} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
          <div className="flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="truncate text-sm font-medium text-gray-900">{entry.name}</h3>
                <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  {entry.category}
                </span>
              </div>
              <p className="mt-1 truncate text-sm text-gray-500">{getEntrySubtitle(entry)}</p>
            </div>
            <img className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="" />
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              {getSystembolagetLink(entry) && (
                <div className="flex w-0 flex-1">
                  <a
                    href={getSystembolagetLink(entry)}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    <BuildingStorefrontIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    Systembolaget
                  </a>
                </div>
              )}
              {getVivinoLink(entry) && (
                <div className="-ml-px flex w-0 flex-1">
                  <a
                    href={getVivinoLink(entry)}
                    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    <StarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    Vivino
                  </a>
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