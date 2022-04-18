import { ChangeEvent, useContext, useReducer } from 'react'
import { PlacesContext, placesReducer } from '../context'
import { useRef } from 'react';
import { SearchResults } from './SearchResults';

export const SearchBar = () => {
   
   const { searchPlaceByTerm } = useContext( PlacesContext )

   const debounceRef = useRef<NodeJS.Timeout>()
   
   const onQueryChanged = ( event:ChangeEvent<HTMLInputElement> ): void => {
      
      if( debounceRef.current ){
         clearTimeout( debounceRef.current )
      }

      debounceRef.current = setTimeout( async () => {
         await searchPlaceByTerm( event.target.value )
      }, 1000 );
   }
   
   return (
      <div className='search-container' >
         <input onChange={ onQueryChanged }  type="text" className='form-control' placeholder='Buscar lugar' />
         <SearchResults />
      </div>
   )
}
