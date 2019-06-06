# GuiLite Previewer - 所code即所得
- [GuiLite](https://gitee.com/idea4good/GuiLite)是最轻量，最简单，最稳定的GUI库，它只有5千行代码
- GuiLite Previewer是一个Visual Studio Code插件，它可以自动读取源代码的GUI布局信息，并实时显示在“预览”页面上
- 有了这个插件，开发者可以完全沉浸在Visual Studio Code中，完成所有的开发工作（例如：代码，UI编辑，编译，运行，调试）
- 通过这种方式，各种GUI库，无需再开发各自独有的UI编辑工具（或IDE）
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
