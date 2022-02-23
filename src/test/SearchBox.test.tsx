import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchBox from '../Components/SearchBar';
import useSearch from '../hooks/useSearch'

//  jest.mock("../hooks/useSearch", () => {
//   return {
//     useSearch: (query, offset) => {
//       return {loading: true, error: false, results: [], hasMore: false
//       };
//     },
//   };
// });
describe('Search Box Component', () => {
  
test('renders input box', () => {
  const component = render(<SearchBox />)
  const searchInput = component.baseElement.querySelector('input')
  expect(searchInput).toBeVisible()
});
test('renders select', () => {
  const component = render(<SearchBox />)
  const select = component.baseElement.querySelector('select')
  expect(select).toBeVisible()
});
})
// test('useSearch hook should be called', () => {
//   const component = render(<SearchBox />)
//   expect(jest.isMockFunction(useSearch)).toBeTruthy();
// expect(useSearch).toBeCalledWith({});
// });
