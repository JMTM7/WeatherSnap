import { useDispatch, useSelector } from 'react-redux';

// Create a custom hook for dispatch
export const useAppDispatch = () => useDispatch();

// Create a custom hook for selector
export const useAppSelector = (selector) => useSelector(selector);