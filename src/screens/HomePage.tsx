import React from 'react'
import { SearchBar, BtnMyLocation, MapView } from '../components'

export const HomePage = () => {
  return (
      <div>
         <SearchBar />
         <MapView />
         <BtnMyLocation />
      </div>
  )
}
