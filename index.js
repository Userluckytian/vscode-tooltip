// index.js
const vscode = require("vscode");

module.exports.activate = function (context) {
    const files = ['html'];
    const LINK_REG = /(?<=<cf-)([\w-]+)/g;
    context.subscriptions.push(
        vscode.languages.registerHoverProvider(files, {
            // #region markdown
            // provideHover: (document, position) => {
            //     const markdown = new vscode.MarkdownString(`<span style="color:#fff;background-color:#666;">&nbsp;&nbsp;&nbsp;NASA code follows:&nbsp;&nbsp;&nbsp;</span>`);  // the newline is necessary for any following appends to work correctly, multiple newlines are reduced to one
            //     const codeBlock = `const a = 12; if (a) return;`;    // any preceding tabs will be rendered in a template literal, so flush left
            //     const codeBlock2 = `const c = 12;\n if (c) return;`;  // works, alternate form with newline
            //     markdown.appendText("\n______________________________\n");  // a fake separator
            //     markdown.appendCodeblock(codeBlock, "javascript");
            //     markdown.appendCodeblock(codeBlock2, "javascript");
            //     markdown.isTrusted = true;
            //     return new vscode.Hover(markdown, new vscode.Range(position, position));
            // }
            // #endregion

            // #region 针对标签名称
            // document: vscode.TextDocument, position: vscode.Position
            provideHover: (document, position) => {
                const line = document.lineAt(position).text; //根据鼠标的位置读取当前所在行的内容
                const componentLink = line.match(LINK_REG) ?? []; //对 cf-开头的字符串进行匹配
                const components = [...new Set([...componentLink])]; //匹配出当前Hover行所包含的组件
                console.log('🚀 ~ components', components);
                if (components.length) {
                    // 会存在空格，记得要顶住最前边去写
                    const md = `#### __列表组件__
<font color='gray' size=1>展示列表数据。</font>
#### __何时使用__
<font color='gray' size=1>请查看组件官方文档：[城方ui组件：cf-list](https://cityfun.com.cn/cf-list.md)。</font>`;
                    const markdown = new vscode.MarkdownString(md);
                    markdown.isTrusted = true;
                    return new vscode.Hover(markdown);
                }
            }
            // #endregion

            // #region 针对图片
            // provideHover: (document, position) => {
            //     const { _line } = position;
            //     const lineContent = document.lineAt(_line).text;
            //     const regexp =
            //         /((https?):)?\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/;
            //     console.log('🚀 ~ regexp', regexp);
            //     const res = lineContent.match(regexp);
            //     console.log("1", res);
            //     if (res === null) {
            //         return;
            //     }
            //     const url = res[0];
            //     console.log("2", url);
            //     return new vscode.Hover('hello');
            // },
            // #endregion
        })
    );
};
