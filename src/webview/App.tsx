declare const vscode: any;
import React from 'react';

interface WalletData {
    address: string;
    balance: string;
}

interface AppProps {
    walletData: WalletData;
}

const App: React.FC<AppProps> = ({ walletData }) => {
    return (
        <div>
            <h1>Wallet Information</h1>
            <p>Address: {walletData.address}</p>
            <p>Balance: {walletData.balance}</p>
        </div>
    );
};

export default App;