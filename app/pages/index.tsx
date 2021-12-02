import React, { Suspense } from "react"
import { BlitzPage } from "blitz"
import ReactAdmin from "app/react-admin/components/ReactAdmin"
import Layout from "app/core/layouts/Layout"

const Home: BlitzPage = () => {
  return (
    <Suspense fallback="Loading...">
      <ReactAdmin />
    </Suspense>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
