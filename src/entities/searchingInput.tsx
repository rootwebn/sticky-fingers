'use client';

import { SearchComponent } from '@/widgets/searchCommand/searchComponent';
import React from 'react';

export const SearchingInput = () => {
  // const [searchInput, setSearchInput] = useState('');
  // const [searchResults, setSearchResults] = useState<ProductCardInterface[]>(
  //   [],
  // );
  //
  // const handleSearchChange = (searchValue: string) => {
  //   setSearchInput(searchValue);
  //   if (searchInput !== '') {
  //     const filteredSearchResults = products.filter((item) => {
  //       return Object.values(item.productName)
  //         .join('')
  //         .toLowerCase()
  //         .includes(searchValue.toLowerCase());
  //     });
  //     setSearchResults(filteredSearchResults);
  //   } else {
  //     setSearchResults([]);
  //   }
  // };
  // //redo searchProductCard to Command component
  return (
    <div className={'flex flex-row min-h-16 min-w-64 justify-between'}>
      <div className={'flex flex-row items-center pl-8'}>
        <SearchComponent />
      </div>
    </div>
  );
};
