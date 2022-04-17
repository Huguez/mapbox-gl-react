import React, { ChangeEvent } from 'react'
import { useRef } from 'react';

export const SearchBar = () => {

   const debounceRef = useRef<NodeJS.Timeout>()
   
   const onQueryChanged = ( event:ChangeEvent<HTMLInputElement> ): void => {
      if( debounceRef.current ){
         clearTimeout( debounceRef.current )
      }

      debounceRef.current = setTimeout( () => {
         console.log( "ref: ", event.target.value );
      }, 1000 );

   }
   
   
   return (
      <div className='search-container' >
         <input onChange={ onQueryChanged }  type="text" className='form-control' placeholder='Buscar lugar' />
      </div>
   )
}
