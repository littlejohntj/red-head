import * as vscode from 'vscode';

export class SolanaExplorerPanel {
    public static currentPanel: SolanaExplorerPanel | undefined;
    private readonly _panel: vscode.WebviewPanel;
    private _disposables: vscode.Disposable[] = [];

    private constructor(panel: vscode.WebviewPanel, pubkey: string) {
        this._panel = panel;

        this._update(pubkey);

        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    }

    public static createOrShow(pubkey: string) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;

        if (SolanaExplorerPanel.currentPanel) {
            SolanaExplorerPanel.currentPanel._panel.reveal(column);
            SolanaExplorerPanel.currentPanel._update(pubkey);
        } else {
            const panel = vscode.window.createWebviewPanel(
                'solanaExplorer',
                'Solana Explorer',
                column || vscode.ViewColumn.One,
                {
                    enableScripts: true
                }
            );
            SolanaExplorerPanel.currentPanel = new SolanaExplorerPanel(panel, pubkey);
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
                <title>Solana Explorer</title>
            </head>
            <body>
                <h1>Solana Explorer</h1>
                <p>Exploring pubkey: ${pubkey}</p>
                <p>Add more Solana account details here...</p>
            </body>
            </html>`;
    }

    public dispose() {
        SolanaExplorerPanel.currentPanel = undefined;

        this._panel.dispose();

        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }
}