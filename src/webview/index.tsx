import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

declare const vscode: any;

// Declare the window.wallet property
declare global {
    interface Window {
        wallet: any;
    }
}

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App walletData={window.wallet} />
        </React.StrictMode>
    );
}