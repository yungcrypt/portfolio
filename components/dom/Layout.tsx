import { useRef, forwardRef } from 'react'
import { mergeRefs } from 'react-merge-refs'

const Layout = forwardRef(({ children, ...props }: any, ref: any) => {
  const localRef = useRef()
  return (
    <div
      ref={mergeRefs([ref, localRef])}
      className='absolute top-0 left-0 z-10 w-screen h-screen overflow-hidden dom bg-zinc-900 text-gray-50'
      style={{height:"100%",width:"100%", position: "absolute", top:0, left:0, overflow:"hidden"}}>
      {children}
    </div>
  )
})
Layout.displayName = 'Layout'

export default Layout
