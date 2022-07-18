// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as nodepath from 'path';
import simplePageTemplate from './template/simplePage';
import searchFormAndTable from './template/searchFormAndTable';
import ModalPage from './template/modal';

/**
 * 
 * @param path 写入的文件路径
 * @param content 写入的文件内容
 * @param fileName 写入的文件名
 * @param fileNameExtra 当文件名存在于该文件夹下时的替代文件名
 */

const writeFile = (path: string, content: string, fileName?: string | undefined, fileNameExtra?: string | undefined) => {
	let newfileName = fileName || 'index.tsx';
	const opt = {
		flag: 'wx' // 但是如果文件路径存在，则文件写入失败。 覆盖写入： 'w'
	};
	const exists: boolean = fs.existsSync(`${path}${nodepath.sep}${newfileName}`);
	if (exists) {
		newfileName = fileNameExtra || 'index_副本.tsx';
	}
	console.log(`写入路径:${path}${nodepath.sep}${newfileName}`);
	fs.writeFile(`${path}${nodepath.sep}${newfileName}`, content, opt, (err) => {
		if (err) {
				vscode.window.showErrorMessage(`写入${newfileName}失败,可能原因是，改文件夹下已存在${newfileName}`);
				return;
		}
		vscode.window.showInformationMessage(`已生成一个示例页面${newfileName}`);
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

	// 添加简单页面
	let generateSimplePage = vscode.commands.registerCommand('react-antd-helper.generateSimplePage', (e) => {
		writeFile(e.fsPath, simplePageTemplate);
	});
	
	// 添加表单表格检索页面
	let generateSearchFormAndTable = vscode.commands.registerCommand('react-antd-helper.generateSearchFormAndTable', (e) => {
		writeFile(e.fsPath, searchFormAndTable);
	});

	// 添加弹窗页面
	let generateModal = vscode.commands.registerCommand('react-antd-helper.generateModal', (e) => {
		writeFile(e.fsPath, ModalPage, 'modalPage.tsx', 'modelPage_副本.tsx');
	});


	// 复制文件名到剪切板
	let copyFileName = vscode.commands.registerCommand('react-antd-helper.copyFileName', (e) => {
		const filename = e ? e?.fsPath?.split('/').pop() : vscode.window.activeTextEditor?.document.fileName.split('/').pop();
		const len = filename.split('.').length;
		const name = filename.split('.')[len - 2];
		const proc = require('child_process').spawn('pbcopy'); 
    proc.stdin.write(name);
    proc.stdin.end();
		vscode.window.showInformationMessage(`${name}已复制到剪切板`);
	});

	// 复制文件名到剪切板
	let copyFolderName = vscode.commands.registerCommand('react-antd-helper.copyFolderName', (e) => {
		const name = e ? e?.fsPath?.split('/').pop() : vscode.window.activeTextEditor?.document.fileName.split('/').pop();
		const proc = require('child_process').spawn('pbcopy'); 
		proc.stdin.write(name);
		proc.stdin.end();
		vscode.window.showInformationMessage(`${name}已复制到剪切板`);
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(generateSimplePage);
	context.subscriptions.push(generateSearchFormAndTable);
	context.subscriptions.push(generateModal);
	context.subscriptions.push(copyFileName);
	context.subscriptions.push(copyFolderName);
}

// this method is called when your extension is deactivated
export function deactivate() {}
