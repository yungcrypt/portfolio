export default function Instructions({ children }: any) {
  return (
    <div
      className='absolute max-w-lg px-10 py-8 text-sm bg-zinc-800 rounded-lg shadow-xl md:text-base top-16 left-1/2 transform -translate-x-1/2'
      style={{ maxWidth: 'calc(100% - 28px)' }}>
      <p className='hidden mb-8 md:block'>{children}</p>
    </div>
  )
}
