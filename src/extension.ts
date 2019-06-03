import * as path from 'path';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('guiLite.preview', () => {
			PreviewPanel.createOrShow(context.extensionPath);
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('guiLite.doThing', () => {
			if (PreviewPanel.currentPanel) {
				PreviewPanel.currentPanel.doRefactor();
			}
		})
	);

	if (vscode.window.registerWebviewPanelSerializer) {
		// Make sure we register a serializer in activation event
		vscode.window.registerWebviewPanelSerializer(PreviewPanel.viewType, {
			async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel, state: any) {
				console.log(`Got state: ${state}`);
				PreviewPanel.revive(webviewPanel, context.extensionPath);
			}
		});
	}
}

/**
 * Manages GuiLite preview webview panels
 */
class PreviewPanel {
	/**
	 * Track the currently panel. Only allow a single panel to exist at a time.
	 */
	public static currentPanel: PreviewPanel | undefined;

	public static readonly viewType = 'preview';

	private readonly _panel: vscode.WebviewPanel;
	private readonly _extensionPath: string;
	private _disposables: vscode.Disposable[] = [];

	public static createOrShow(extensionPath: string) {
		const column = vscode.window.activeTextEditor
			? vscode.window.activeTextEditor.viewColumn
			: undefined;

		// If we already have a panel, show it.
		if (PreviewPanel.currentPanel) {
			PreviewPanel.currentPanel._panel.reveal(column);
			return;
		}

		// Otherwise, create a new panel.
		const panel = vscode.window.createWebviewPanel(
			PreviewPanel.viewType,
			'GuiLite preview',
			column || vscode.ViewColumn.One,
			{
				// Enable javascript in the webview
				enableScripts: true,

				// And restrict the webview to only loading content from our extension's `media` directory.
				localResourceRoots: [vscode.Uri.file(path.join(extensionPath, 'media'))]
			}
		);

		PreviewPanel.currentPanel = new PreviewPanel(panel, extensionPath);
	}

	public static revive(panel: vscode.WebviewPanel, extensionPath: string) {
		PreviewPanel.currentPanel = new PreviewPanel(panel, extensionPath);
	}

	private constructor(panel: vscode.WebviewPanel, extensionPath: string) {
		this._panel = panel;
		this._extensionPath = extensionPath;

		// Set the webview's initial html content
		this._update();

		// Listen for when the panel is disposed
		// This happens when the user closes the panel or when the panel is closed programatically
		this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

		// Update the content based on view changes
		this._panel.onDidChangeViewState(
			e => {
				if (this._panel.visible) {
					this._update();
				}
			},
			null,
			this._disposables
		);

		// Handle messages from the webview
		this._panel.webview.onDidReceiveMessage(
			message => {
				switch (message.command) {
					case 'alert':
						vscode.window.showErrorMessage(message.text);
						return;
				}
			},
			null,
			this._disposables
		);
	}

	public doRefactor() {
		// Send a message to the webview webview.
		// You can send any JSON serializable data.
		this._panel.webview.postMessage({ command: 'refactor' });
	}

	public dispose() {
		PreviewPanel.currentPanel = undefined;

		// Clean up our resources
		this._panel.dispose();

		while (this._disposables.length) {
			const x = this._disposables.pop();
			if (x) {
				x.dispose();
			}
		}
	}

	private _update() {
		let uri = vscode.Uri.file('D:\\test.txt');
		// assuming the file was saved, let's open it in a view column
		vscode.workspace.openTextDocument(uri).then(doc=>{
			let sourceCode = doc.getText();
			switch (this._panel.viewColumn) {
				case vscode.ViewColumn.One:
				default:
					this._panel.title = 'GuiLite Preview';
					this._panel.webview.html = this._getHtmlForWebview(sourceCode);
			}
			// vscode.window.showTextDocument(doc, vscode.ViewColumn.Two, true);
		});
	}

	private _getHtmlForWebview(sourceCode: string) {
		return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="Content-Type" Content="text/html; charset=utf-8;">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>GuiLite preview</title>
            </head>
			<body>
				<h1 id="source-code">${sourceCode}</h1>
				<canvas id="screen" width="1024" height="768"></canvas>
			</body>
			<script type="text/javascript">
				function draw_single_widget(context, str, rect){
					console.log(rect.toString());
					context.fillStyle = "#FF0000";
					context.fillRect(rect[0], rect[1], rect[2], rect[3]);
					context.fillText(str, rect[0], rect[1]);
				}

				function draw_widgets(context, widgets){
					for( var i = 0; i < widgets.length; i++){
						rect = widgets[i].match(/[^A-Za-z_]\\d+/g);
						string = "null"
						strings = widgets[i].match(/".*"/g);
						if(strings.length != 1){
							console.log('Invalid strings' + strings.length.toString() + ':' + strings.toString());
						}else{
							string = strings[0].replace(/"/g,'');//remove "
						}
						console.log(string.toString() + rect.toString());
						draw_single_widget(context, string, rect)
					}
				}

				function search_widgets(tree){
					var widgets = tree.match(/{ *&[^,]*,[^,]*,[^,]*,[^,]*,[^,]*,[^,]*,[^,]*/g);
					console.log(widgets.length.toString() + ':' + widgets.toString());
					return widgets;
				}

				function search_trees(source){
					var trees = source.match(/WND_TREE.*};$/mg);
					console.log(trees.length.toString() + ':' + trees.toString());
    				return trees;
				}

				const canvas = document.getElementById('screen');
				const context = canvas.getContext('2d');			

				var source_code = 'static c_button s_exit_button;WND_TREE s_dialog_widgets[] = {	{&s_exit_button, ID_EXIT_BUTTON, "Exit", 50, 50, 100, 30}, {&s_exit_button, ID_EXIT_BUTTON, "Welcome", 100, 100, 100, 30}, {NULL, 0 , 0, 0, 0, 0, 0}};\\n WND_TREE s_dialog_widgets1[] = {	{&s_exit_button, ID_EXIT_BUTTON, "Exit1", 150, 150, 100, 30}, {&s_exit_button, ID_EXIT_BUTTON, "Welcome_1", 200, 200, 100, 30}, {NULL, 0 , 0, 0, 0, 0, 0}};\\n';

				var trees = search_trees(source_code);
				for( var i = 0; i < trees.length; i++){
					var widgets = search_widgets(trees[i]);
					draw_widgets(context, widgets);
				}

				var text = document.getElementById('source-code').textContent;
				console.log(text);

			</script>  
            </html>`;
	}
}
