import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RouteLoader } from './RouteLoader';
import { ErrorBoundary } from '../components/layout/ErrorBoundary';

// Eager load the Landing page
import Landing from '../pages/Landing';

// Lazy load other routes
const Trading = React.lazy(() => import('../pages/Trading'));
const Portfolio = React.lazy(() => import('../pages/Portfolio'));
const Testnet = React.lazy(() => import('../pages/Testnet'));
const Token = React.lazy(() => import('../pages/Token'));
const Campaigns = React.lazy(() => import('../pages/Campaigns'));
const Referrals = React.lazy(() => import('../pages/Referrals'));

export const AppRoutes: React.FC = () => {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Landing />} />
        
        <Route path="/trading" element={
          <RouteLoader>
            <Trading />
          </RouteLoader>
        } />
        
        <Route path="/portfolio" element={
          <RouteLoader>
            <Portfolio />
          </RouteLoader>
        } />
        
        <Route path="/testnet" element={
          <RouteLoader>
            <Testnet />
          </RouteLoader>
        } />
        
        <Route path="/token" element={
          <RouteLoader>
            <Token />
          </RouteLoader>
        } />
        
        <Route path="/campaigns" element={
          <RouteLoader>
            <Campaigns />
          </RouteLoader>
        } />
        
        <Route path="/referrals" element={
          <RouteLoader>
            <Referrals />
          </RouteLoader>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ErrorBoundary>
  );
};