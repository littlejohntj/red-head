// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Keypair } from '@solana/web3.js';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {

    const disposable = vscode.commands.registerCommand('red-head.helloWorld', () => {

        // Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from red-head!');
		// vscode.window.showQuickPick(['one', 'two', 'three'])

		// vscode.window.showInputBox().then((value) => {
        //     // // This opens a webview we create
		// 	// SolanaExplorerPanel.createOrShow(value!)

        //     // // This is how we access settings 
        //     // let config = vscode.workspace.getConfiguration('solanaExplorer');
        //     // let network = config.get<string>('network');

        //     // // This shows an info bubble
        //     // vscode.window.showInformationMessage(`Network: ${network}`);
		// })

        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const fileContent = document.getText();
            
            // Here you would process the fileContent to extract keypair information
            console.log('File content:', fileContent);
            
            // You might want to show this in a webview or process it further
            vscode.window.showInformationMessage(`File ${document.fileName} accessed`);
        } else {
            vscode.window.showWarningMessage('No active editor found');
        }

	});

    const openWallet = vscode.commands.registerCommand('red-head.openWallet', () => {

        const panel = vscode.window.createWebviewPanel(
            'reactWebview',
            'React Webview',
            vscode.ViewColumn.One,
            {
                enableScripts: true
            }
        );

        const scriptPathOnDisk = vscode.Uri.file(
            path.join(context.extensionPath, 'out', 'webview.js')
        );
        const scriptUri = panel.webview.asWebviewUri(scriptPathOnDisk);

        // Get data from your extension
        const walletData = {
            address: '0x1234...', // Example data
            balance: '100 SOL'    // Example data
        };

        // Pass data to webview
        panel.webview.html = getWebviewContent(scriptUri, walletData);

        // Handle messages from the webview
        panel.webview.onDidReceiveMessage(
            message => {
                switch (message.command) {
                    case 'alert':
                        vscode.window.showInformationMessage(message.text);
                        return;
                }
            },
            undefined,
            context.subscriptions
        );

	});

	context.subscriptions.push(disposable);
    context.subscriptions.push(openWallet);
}

function getWebviewContent(scriptUri: vscode.Uri, data: any) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Wallet Webview</title>
    </head>
    <body>
        <div id="root"></div>
        <script>
            window.wallet = ${JSON.stringify(data)};
        </script>
        <script src="${scriptUri}"></script>
    </body>
    </html>`;
}


// This method is called when your extension is deactivated
export function deactivate() {}


        // const editor = vscode.window.activeTextEditor;
        // if (editor) {
        //     const document = editor.document;
        //     const keypairFileContents = document.getText();

        //     try {
        //         const keypair = Keypair.fromSecretKey( Uint8Array.from( JSON.parse(keypairFileContents)) ) 
        //         SolanaWalletPanel.createOrShow(keypair)                
        //     } catch {
        //         vscode.window.showWarningMessage('Could not open active file as a wallet.');
        //     }

        // } else {
        //     vscode.window.showWarningMessage('No active editor found');
        // }