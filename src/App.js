import React from 'react';
import { AuthProvider } from './lib/context';
import Navigation from './Navigation';

export default () => <AuthProvider><Navigation /></AuthProvider>;
