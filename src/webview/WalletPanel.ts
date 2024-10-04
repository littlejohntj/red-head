import * as vscode from 'vscode';
import { Keypair } from '@solana/web3.js';

export class SolanaWalletPanel {
    public static currentPanel: SolanaWalletPanel | undefined;
    private readonly _panel: vscode.WebviewPanel;
    private _disposables: vscode.Disposable[] = [];

    private constructor(panel: vscode.WebviewPanel, pubkey: string) {
        this._panel = panel;

        this._update(pubkey);

        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    }

    public static createOrShow(keypair: Keypair) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;

        if (SolanaWalletPanel.currentPanel) {
            SolanaWalletPanel.currentPanel._panel.reveal(column);
            SolanaWalletPanel.currentPanel._update(keypair.publicKey.toBase58());
        } else {
            const panel = vscode.window.createWebviewPanel(
                'red-head',
                'red-head',
                column || vscode.ViewColumn.One,
                {
                    enableScripts: true
                }
            );
            SolanaWalletPanel.currentPanel = new SolanaWalletPanel(panel, keypair.publicKey.toBase58());
        }
    }

    private _update(pubkey: string) {
        const webview = this._panel.webview;
        this._panel.title = `Solana Explorer: ${pubkey}`;
        this._panel.webview.html = this._getHtmlForWebview(webview, pubkey);
    }

    private _getHtmlForWebview(webview: vscode.Webview, pubkey: string) {
        return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Red Head Wallet</title>
            </head>
            <body>
                <h1>Red Head Wallet</h1>
                <p>Public Key: ${pubkey}</p>
                <p>Add more Solana account details here...</p>
            </body>
            </html>`;
    }

    public dispose() {
        SolanaWalletPanel.currentPanel = undefined;

        this._panel.dispose();

        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }
}
