# GuiLite Previewer - 所见即所得的GuiLite开发插件
- [GuiLite](https://gitee.com/idea4good/GuiLite)是最轻量，最简单，最稳定的GUI库，它只有5千行C++代码
- GuiLite Previewer是一个Visual Studio Code插件，它可以自动提取源代码的GUI布局信息，并实时显示在“预览”页面上(所见即所得)
- **不需要**“拖拽”控件，仅通过敲代码，就可以完成所有工作（例如：代码，UI编辑，编译，运行，调试）
- **不需要**使用庞大的GUI编辑工具（或IDE，例如：Android Studio, Qt designer）
- **不需要**使用可扩展标记语言（例如：xml, xaml）

## Demo
![demo](demo.gif)

## 如何编译/使用GuiLite Previewer?
1. Download npm, and install
2. Run in Windows command line: `cd GuiLitePreviwer` ⚠️and make sure you're in **GuiLitePreviwer** folder⚠️
3. Run in Windows command line: `npm install` 
4. Run in Windows command line: `code .` which will open the project in VS Code window
5. In VS Code window you just opened, Press `F5` to build/debug the extension
6. You will get an new VS Code window with the extension you build above
7. In the new VS Code window, open your source code(e.g. test.cpp)
8. `ctrl + shift + p`, and input `GuiLite: preview layout`
9. You will see your GUI layout in preview page
