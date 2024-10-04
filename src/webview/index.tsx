import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// import * as React from 'react';

// const App: React.FC = () => {
//     return <h1>Hello from React!</h1>;
//   };
  

// export default App;

// // src/extension.ts
// import * as vscode from 'vscode';
// import * as path from 'path';

// export function activate(context: vscode.ExtensionContext) {
//     context.subscriptions.push(
//         vscode.commands.registerCommand('red-head.openWebview', () => {
//             const panel = vscode.window.createWebviewPanel(
//                 'reactWebview',
//                 'React Webview',
//                 vscode.ViewColumn.One,
//                 {
//                     enableScripts: true
//                 }
//             );

//             const scriptPathOnDisk = vscode.Uri.file(
//                 path.join(context.extensionPath, 'out', 'webview.js')
//             );
//             const scriptUri = panel.webview.asWebviewUri(scriptPathOnDisk);

//             panel.webview.html = getWebviewContent(scriptUri);
//         })
//     );
// }

// function getWebviewContent(scriptUri: vscode.Uri) {
//     return `<!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>React Webview</title>
//     </head>
//     <body>
//         <div id="root"></div>
//         <script src="${scriptUri}"></script>
//     </body>
//     </html>`;
// }
