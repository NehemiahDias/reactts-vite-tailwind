import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet, useRouteError } from 'react-router-dom';
import { App } from './App.tsx';
import './index.scss';

// Parent = #root
const RootLayout = () => {
    return (
        <>
            <Outlet />
        </>
    );
};

const ErrorBoundary = () => {
    const error = useRouteError() as Error;

    return (
        <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
            <h1>Something went wrong</h1>
            <p style={{ color: '#666', margin: '1rem 0' }}>{error?.message || 'An unexpected error occurred'}</p>
            {import.meta.env.DEV && error?.stack && (
                <pre
                    style={{
                        padding: '1rem',
                        background: '#f5f5f5',
                        overflow: 'auto',
                        fontSize: '12px',
                        borderRadius: '4px',
                    }}
                >
                    {error.stack}
                </pre>
            )}
            <button
                onClick={() => window.location.reload()}
                style={{
                    marginTop: '1rem',
                    padding: '0.5rem 1rem',
                    background: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
            >
                Reload Page
            </button>
        </div>
    );
};

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorBoundary />,
        children: [
            {
                index: true,
                element: <App />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
