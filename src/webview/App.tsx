declare const vscode: any;
import React from 'react';
import { Keypair } from '@solana/web3.js';

interface WalletData {
    keypair: string;
}

interface AppProps {
    walletData: WalletData;
}

const App: React.FC<AppProps> = ({ walletData }) => {

    Keypair.generate()
    
    return (
        <div>
            <h1>Wallet Information</h1>
            <p>Address: {walletData.keypair}</p>
        </div>
    );
};

export default App;