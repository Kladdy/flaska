import { classNames } from "@/utils/tools"

interface Props {
  fullHeight?: boolean
}

// Based on https://tailwindflex.com/@anonymous/loading-dots
const LoadingDots = (props: Props) => {
  return (
    <div className={classNames('flex space-x-2 justify-center items-center ',
                                props.fullHeight ? "h-screen" : "")}>
      <span className='sr-only'>Loading...</span>
      <div className='h-8 w-8 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
      <div className='h-8 w-8 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
      <div className='h-8 w-8 bg-indigo-600 rounded-full animate-bounce'></div>
    </div>
  )
}

export default LoadingDots