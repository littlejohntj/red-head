import React from 'react';
import { Keypair } from '@solana/web3.js';

declare const vscode: any;

interface WalletData {
    keypair: string;
}

interface AppProps {
    walletData: WalletData;
}

const App: React.FC<AppProps> = ({ walletData }) => {

    const keypair = Keypair.fromSecretKey( Uint8Array.from( JSON.parse(walletData.keypair)) )
    
    return (
        <div>
            <h1>Wallet Information</h1>
            <p>Address: {keypair.publicKey.toBase58()}</p>
        </div>
    );
};

export default App;