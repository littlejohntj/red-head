// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
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

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "red-head" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('red-head.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from red-head!');
		// vscode.window.showQuickPick(['one', 'two', 'three'])

		vscode.window.showInputBox().then((value) => {
			SolanaExplorerPanel.createOrShow(value!)
		})

		vscode.window
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
