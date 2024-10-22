'use client';

import { SearchComponent } from '@/entities/searchComponent';
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
  return <SearchComponent />;
};
