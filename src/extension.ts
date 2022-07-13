// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import simplePageTemplate from './template/simplePage';
import searchFormAndTable from './template/searchFormAndTable';

const writeFile = (path: string,content: string) => {
	let fileName = '/index.tsx';
	const opt = {
		flag: 'wx' // 但是如果文件路径存在，则文件写入失败。 覆盖写入： 'w'
	};
	const exists = fs.existsSync(path + fileName);
	if (exists) {
		fileName = '/index_副本.tsx';
	}
	fs.writeFile(path + fileName, content, opt, (err) => {
		if (err) {
				vscode.window.showErrorMessage(`写入${fileName}失败`);
				return;
		}
		vscode.window.showInformationMessage(`已生成一个示例页面${fileName}`);
	});
};

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "react-antd-helper" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('react-antd-helper.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from react-antd-helper!');
	});

	let generateSimplePage = vscode.commands.registerCommand('react-antd-helper.generateSimplePage', (e) => {
		writeFile(e.path, simplePageTemplate);
	});
	
	let generateSearchFormAndTable = vscode.commands.registerCommand('react-antd-helper.generateSearchFormAndTable', (e) => {
		writeFile(e.path, searchFormAndTable);
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(generateSimplePage);
	context.subscriptions.push(generateSearchFormAndTable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
