import { Suspense } from 'react'
import Loading from './loading'

const VideosLayout = ({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) => {
  return (
    <section>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </section>
  )
}

export default VideosLayout
