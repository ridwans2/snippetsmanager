"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnippetsTreeDataProvider = exports.SnippetTreeItem = void 0;
const vscode = require("vscode");
class SnippetTreeItem extends vscode.TreeItem {
    constructor(label, collapsibleState, snippet, group, command) {
        super(label, collapsibleState);
        this.label = label;
        this.collapsibleState = collapsibleState;
        this.snippet = snippet;
        this.group = group;
        this.command = command;
        this.tooltip = snippet ? `${snippet.content}\n\nGroup: ${snippet.group}` : label;
        if (snippet) {
            // this.description = snippet.group;  // Dikomentari untuk tidak menampilkan nama group
            this.contextValue = `snippet-${snippet.type}`;
            this.iconPath = new vscode.ThemeIcon(snippet.type === 'terminal' ? 'terminal' : 'code');
            // Tidak set command default agar tidak langsung dieksekusi saat klik
        }
        else if (group) {
            this.contextValue = 'group';
        }
    }
}
exports.SnippetTreeItem = SnippetTreeItem;
class SnippetsTreeDataProvider {
    constructor(manager) {
        this.manager = manager;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    }
    refresh() {
        this._onDidChangeTreeData.fire();
    }
    getTreeItem(element) {
        // Debug: log label & contextValue untuk inspeksi saat development
        try {
            // eslint-disable-next-line no-console
            console.log(`[SnippetsTree] getTreeItem: label=${element.label}, contextValue=${element.contextValue}`);
        }
        catch (e) { }
        return element;
    }
    getChildren(element) {
        if (!element) {
            // Root: show groups
            const data = this.manager.getData();
            return Promise.resolve(data.groups.map(g => new SnippetTreeItem(g, vscode.TreeItemCollapsibleState.Collapsed, undefined, g)));
        }
        if (element.group) {
            // Inside a group: show snippets
            const data = this.manager.getData();
            const snippets = data.snippets.filter(s => s.group === element.group);
            return Promise.resolve(snippets.map(s => new SnippetTreeItem(s.title, vscode.TreeItemCollapsibleState.None, s, undefined, {
                command: s.type === 'terminal' ? 'rajaSnippets.runSnippet' : 'rajaSnippets.insertSnippet',
                title: s.type === 'terminal' ? 'Run in Terminal' : 'Insert Snippet',
                arguments: [{ snippet: s }]
            })));
        }
        return Promise.resolve([]);
    }
}
exports.SnippetsTreeDataProvider = SnippetsTreeDataProvider;
//# sourceMappingURL=treeProvider.js.map