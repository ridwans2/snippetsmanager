import * as vscode from 'vscode';
import { SnippetManager, SnippetRecord } from './snippetManager';

export class SnippetTreeItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly snippet?: SnippetRecord,
    public readonly group?: string,
    public readonly command?: vscode.Command
  ) {
    super(label, collapsibleState);
    this.tooltip = snippet ? `${snippet.content}\n\nGroup: ${snippet.group}` : label;
    if (snippet) {
      // this.description = snippet.group;  // Dikomentari untuk tidak menampilkan nama group
      this.contextValue = `snippet-${snippet.type}`;
      this.iconPath = new vscode.ThemeIcon(snippet.type === 'terminal' ? 'terminal' : 'code');
      // Tidak set command default agar tidak langsung dieksekusi saat klik
    } else if (group) {
      this.contextValue = 'group';
    }
  }
}

export class SnippetsTreeDataProvider implements vscode.TreeDataProvider<SnippetTreeItem> {
  private _onDidChangeTreeData: vscode.EventEmitter<SnippetTreeItem | undefined | null | void> = new vscode.EventEmitter<SnippetTreeItem | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<SnippetTreeItem | undefined | null | void> = this._onDidChangeTreeData.event;

  constructor(private manager: SnippetManager) {}

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: SnippetTreeItem): vscode.TreeItem {
    // Debug: log label & contextValue untuk inspeksi saat development
    try {
      // eslint-disable-next-line no-console
      console.log(`[SnippetsTree] getTreeItem: label=${element.label}, contextValue=${element.contextValue}`);
    } catch (e) {}
    return element;
  }

  getChildren(element?: SnippetTreeItem): Thenable<SnippetTreeItem[]> {
    if (!element) {
      // Root: show groups
      const data = this.manager.getData();
      return Promise.resolve(data.groups.map(g => new SnippetTreeItem(g, vscode.TreeItemCollapsibleState.Collapsed, undefined, g)));
    }
    if (element.group) {
      // Inside a group: show snippets
      const data = this.manager.getData();
      const snippets = data.snippets.filter(s => s.group === element.group);
      return Promise.resolve(
        snippets.map(s => new SnippetTreeItem(
          s.title,
          vscode.TreeItemCollapsibleState.None,
          s,
          undefined,
          {
            command: s.type === 'terminal' ? 'rajaSnippets.runSnippet' : 'rajaSnippets.insertSnippet',
            title: s.type === 'terminal' ? 'Run in Terminal' : 'Insert Snippet',
            arguments: [{ snippet: s }]
          }
        ))
      );
    }
    return Promise.resolve([]);
  }
}