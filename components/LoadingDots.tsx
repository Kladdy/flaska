interface Props {

}

const LoadingDots = (props: Props) => {
  return (
    <div className='flex space-x-2 justify-center items-center h-screen'>
      <span className='sr-only'>Loading...</span>
      <div className='h-8 w-8 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
      <div className='h-8 w-8 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
      <div className='h-8 w-8 bg-indigo-600 rounded-full animate-bounce'></div>
    </div>
  )
}

export default LoadingDots