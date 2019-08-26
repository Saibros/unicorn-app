import { useContext } from 'react';
import { NavigationContext } from '@react-navigation/core';

export const useNavigation = () => useContext(NavigationContext);

