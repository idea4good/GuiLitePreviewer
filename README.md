# GuiLite Previewer - Preview the layout for GuiLite App code
- [GuiLite](https://github.com/idea4good/GuiLite) is the smalles/simplest/stablest GUI library for all platforms, it has only 5,000 line C++ code.
- GuiLite Previewer is a Visual Studio Code extension, it could help developer to code and preview your GUI at same time
- You could do all things(e.g. code/design/build/run/debug your GuiLite App) with VS Code
- No need for special GUI editor(e.g. Qt designer) any more.
## Demo

![demo](demo.gif)

### `vscode` module

- [`window.createWebviewPanel`](https://code.visualstudio.com/api/references/vscode-api#window.createWebviewPanel)
- [`window.registerWebviewPanelSerializer`](https://code.visualstudio.com/api/references/vscode-api#window.registerWebviewPanelSerializer)

## How to run?

- Open this project in VS Code 1.25+
- `npm install`
- `F5` to start debugging

Run the `GuiLite: preview layout` to preview the GUI layout of your GuiLite App code.
