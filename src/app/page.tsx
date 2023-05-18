'use client'

import { Provider } from 'react-redux'

import { store } from '@/store'

import PageContent from '@/components/page-content/page-content'

export default function Page() {
  return (
    <Provider store={store}>
      <PageContent />
    </Provider>
  )
}
