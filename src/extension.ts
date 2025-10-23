import * as vscode from 'vscode';import * as vscode from 'vscode';import * as vscode from 'vscode';

import { SnippetManager, SnippetRecord } from './snippetManager';

import { SnippetsTreeDataProvider } from './treeProvider';import { SnippetManager, SnippetRecord } from './snippetManager';import { SnippetManager, SnippetRecord } from './snippetManager';



declare const TextEncoder: any;import { SnippetsTreeDataProvider } from './treeProvider';import { SnippetsTreeDataProvider } from './treeProvider';

declare const TextDecoder: any;



/**

 * Resolve dynamic placeholders like {$variable} in snippet contentdeclare const TextEncoder: any;declare const TextEncoder: any;

 * Prompts user for each placeholder and replaces them.

 */declare const TextDecoder: any;declare const TextDecoder: any;

async function resolvePlaceholders(template: string): Promise<string> {

  // Find all {$name} placeholders using regex

  const placeholderRegex = /\{\$(\w+)\}/g;

  const placeholders = new Map<string, string | undefined>();/**/**

  let match;

 * Resolve dynamic placeholders like {$variable} in snippet content * Resolve dynamic placeholders like {$variable} in snippet content

  // Extract unique placeholder names

  while ((match = placeholderRegex.exec(template)) !== null) { * Prompts user for each placeholder and replaces them. * Prompts user for each placeholder and replaces them.

    const name = match[1];

    if (!placeholders.has(name)) { */ */

      placeholders.set(name, undefined);

    }async function resolvePlaceholders(template: string): Promise<string> {async function resolvePlaceholders(template: string): Promise<string> {

  }

  // Find all {$name} placeholders using regex  // Find all {$name} placeholders using regex

  // Prompt user for each placeholder

  for (const [name] of placeholders) {  const placeholderRegex = /\{\$(\w+)\}/g;  const placeholderRegex = /\{\$(\w+)\}/g;

    const value = await vscode.window.showInputBox({

      prompt: `Masukkan nilai untuk ${name}`,  const placeholders = new Map<string, string | undefined>();  const placeholders = new Map<string, string | undefined>();

      placeHolder: name,

      validateInput: (val) => {  let match;  let match;

        if (val.trim() === '') return 'Nilai tidak boleh kosong';

        return null;

      }

    });  // Extract unique placeholder names  // Extract unique placeholder names

    if (value === undefined) {

      // User cancelled, abort insertion  while ((match = placeholderRegex.exec(template)) !== null) {  while ((match = placeholderRegex.exec(template)) !== null) {

      throw new Error('Operasi dibatalkan');

    }    const name = match[1];    const name = match[1];

    placeholders.set(name, value);

  }    if (!placeholders.has(name)) {    if (!placeholders.has(name)) {



  // Replace placeholders in the template      placeholders.set(name, undefined);      placeholders.set(name, undefined);

  let resolved = template;

  for (const [name, value] of placeholders) {    }    }

    if (value !== undefined) {

      const regex = new RegExp(`\\{\\$${name}\\}`, 'g');  }  }

      resolved = resolved.replace(regex, value);

    }

  }

  // Prompt user for each placeholder  // Prompt user for each placeholder

  return resolved;

}  for (const [name] of placeholders) {  for (const [name] of placeholders) {



export function activate(context: vscode.ExtensionContext) {    const value = await vscode.window.showInputBox({    const value = await vscode.window.showInputBox({

  const manager = new SnippetManager(context);

  const treeProvider = new SnippetsTreeDataProvider(manager);      prompt: `Masukkan nilai untuk ${name}`,      prompt: `Masukkan nilai untuk ${name}`,

vscode.window.registerTreeDataProvider('rajaSnippetsExplorer', treeProvider);

      placeHolder: name,      placeHolder: name,

  // Register refresh command used by view

  context.subscriptions.push(      validateInput: (val) => {      validateInput: (val) => {

    vscode.commands.registerCommand('rajaSnippets.refresh', () => treeProvider.refresh()),

        if (val.trim() === '') return 'Nilai tidak boleh kosong';        if (val.trim() === '') return 'Nilai tidak boleh kosong';

    vscode.commands.registerCommand('rajaSnippets.addSnippetToGroup', async (groupItem) => {

      const groupName = groupItem.label;        return null;        return null;

      const title = await vscode.window.showInputBox({ 

        prompt: 'Masukkan judul snippet',      }      }

        placeHolder: 'Snippet Saya'

      });    });    });

      if (!title) { return; }

          if (value === undefined) {    if (value === undefined) {

      // Create empty snippet and open a webview editor (no Untitled file)

      await manager.addSnippet(groupName, title, '', 'code');      // User cancelled, abort insertion      // User cancelled, abort insertion

      const snippets = manager.getData().snippets;

      const newSnippet = snippets[snippets.length - 1];      throw new Error('Operasi dibatalkan');      throw new Error('Operasi dibatalkan');



      // Open a webview panel to edit the newly created snippet (same UX as edit flow)    }    }

      const panel = vscode.window.createWebviewPanel(

        'rajaSnippetEditor',    placeholders.set(name, value);    placeholders.set(name, value);

        `Edit: ${newSnippet.title}`,

        vscode.ViewColumn.One,  }  }

        { enableScripts: true }

      );



      const escapeHtml = (s: string) => {  // Replace placeholders in the template  // Replace placeholders in the template

        return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

      };  let resolved = template;  let resolved = template;



      panel.webview.html = `<!doctype html>  for (const [name, value] of placeholders) {  for (const [name, value] of placeholders) {

      <html>

      <head>    if (value !== undefined) {    if (value !== undefined) {

        <meta charset="utf-8" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />      const regex = new RegExp(`\\{\\$${name}\\}`, 'g');      const regex = new RegExp(`\\{\\$${name}\\}`, 'g');

        <style>

          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; padding: 12px; color: var(--vscode-editor-foreground); background: var(--vscode-editor-background); }      resolved = resolved.replace(regex, value);      resolved = resolved.replace(regex, value);

          label { display:block; margin-top:8px; font-weight:600 }

          input[type="text"], textarea, select { width:100%; box-sizing: border-box; padding:8px; margin-top:4px; background: var(--vscode-input-background); color: var(--vscode-input-foreground); border: 1px solid var(--vscode-input-border); }    }    }

          textarea { min-height: 240px; font-family: monospace; white-space: pre; }

          .row { display:flex; gap:8px; margin-top:12px }  }  }

          button { padding:8px 12px; border-radius:4px; border:none; cursor:pointer; display: flex; align-items: center; gap: 4px; }

          button.save { background: var(--vscode-button-background); color: var(--vscode-button-foreground) }

          button.insert { background: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground) }

          button.run { background: var(--vscode-terminal-background); color: var(--vscode-terminal-foreground) }  return resolved;  return resolved;

          button.delete { background: var(--vscode-errorForeground); color: white }

        </style>}}

      </head>

      <body>

        <label>Judul</label>

        <input id="title" type="text" value="${escapeHtml(newSnippet.title)}" />export function activate(context: vscode.ExtensionContext) {export function activate(context: vscode.ExtensionContext) {



        <label>Content</label>  const manager = new SnippetManager(context);  const manager = new SnippetManager(context);

        <textarea id="content">${escapeHtml(newSnippet.content)}</textarea>

  const treeProvider = new SnippetsTreeDataProvider(manager);  const treeProvider = new SnippetsTreeDataProvider(manager);

        <p style="font-size:11px;margin:0 0 8px 0;color:var(--vscode-descriptionForeground)">

          Tips: Gunakan placeholder dinamis seperti <code>{$nama}</code> untuk meminta input saat snippet disisipkan/dijalankan.vscode.window.registerTreeDataProvider('rajaSnippetsExplorer', treeProvider);vscode.window.registerTreeDataProvider('rajaSnippetsExplorer', treeProvider);

        </p>



        <label>Tipe</label>

        <select id="type">  // Register refresh command used by view  // Register refresh command used by view

          <option value="code" ${newSnippet.type === 'code' ? 'selected' : ''}>Kode</option>

          <option value="terminal" ${newSnippet.type === 'terminal' ? 'selected' : ''}>Terminal</option>  context.subscriptions.push(  context.subscriptions.push(

        </select>

    vscode.commands.registerCommand('rajaSnippets.refresh', () => treeProvider.refresh()),    vscode.commands.registerCommand('rajaSnippets.refresh', () => treeProvider.refresh()),

        <label>Group</label>

        <select id="group">

          ${manager.getData().groups.map(g => `<option value="${escapeHtml(g)}" ${g === newSnippet.group ? 'selected' : ''}>${escapeHtml(g)}</option>`).join('')}

        </select>    vscode.commands.registerCommand('rajaSnippets.addSnippetToGroup', async (groupItem) => {    vscode.commands.registerCommand('rajaSnippets.addSnippetToGroup', async (groupItem) => {



        <div class="row">      const groupName = groupItem.label;      const groupName = groupItem.label;

          <button class="save" title="Simpan">💾 Simpan</button>

          <button class="insert" title="Sisipkan">📝 Sisipkan</button>      const title = await vscode.window.showInputBox({       const title = await vscode.window.showInputBox({ 

          <button class="run" title="Jalankan">▶️ Jalankan</button>

          <button class="delete" title="Hapus">🗑️ Hapus</button>        prompt: 'Masukkan judul snippet',        prompt: 'Masukkan judul snippet',

        </div>

        placeHolder: 'Snippet Saya'        placeHolder: 'Snippet Saya'

        <script>

          const vscode = acquireVsCodeApi();      });      });

          document.querySelector('.save').addEventListener('click', () => {

            const title = document.getElementById('title').value;      if (!title) { return; }      if (!title) { return; }

            const content = document.getElementById('content').value;

            const type = document.getElementById('type').value;            

            const group = document.getElementById('group').value;

            vscode.postMessage({ command: 'save', title, content, type, group });      // Create empty snippet and open a webview editor (no Untitled file)      // Create empty snippet and open a webview editor (no Untitled file)

          });

          document.querySelector('.insert').addEventListener('click', () => {      await manager.addSnippet(groupName, title, '', 'code');      await manager.addSnippet(groupName, title, '', 'code');

            vscode.postMessage({ command: 'insert' });

          });      const snippets = manager.getData().snippets;      const snippets = manager.getData().snippets;

          document.querySelector('.run').addEventListener('click', () => {

            vscode.postMessage({ command: 'run' });      const newSnippet = snippets[snippets.length - 1];      const newSnippet = snippets[snippets.length - 1];

          });

          document.querySelector('.delete').addEventListener('click', () => {

            vscode.postMessage({ command: 'delete' });

          });      // Open a webview panel to edit the newly created snippet (same UX as edit flow)      // Open a webview panel to edit the newly created snippet (same UX as edit flow)

        </script>

      </body>      const panel = vscode.window.createWebviewPanel(      const panel = vscode.window.createWebviewPanel(

      </html>`;

        'rajaSnippetEditor',        'rajaSnippetEditor',

      const msgDisp = panel.webview.onDidReceiveMessage(async (msg) => {

        if (msg.command === 'save') {        `Edit: ${newSnippet.title}`,        `Edit: ${newSnippet.title}`,

          await manager.updateSnippet(newSnippet.id, { title: msg.title, content: msg.content, type: msg.type, group: msg.group });

          vscode.window.showInformationMessage('Snippet telah disimpan.');        vscode.ViewColumn.One,        vscode.ViewColumn.One,

          treeProvider.refresh();

          panel.dispose();        { enableScripts: true }        { enableScripts: true }

        } else if (msg.command === 'insert') {

          const editor = vscode.window.activeTextEditor;      );      );

          if (!editor) {

            vscode.window.showErrorMessage('No active editor');

            return;

          }      const escapeHtml = (s: string) => {      const escapeHtml = (s: string) => {

          try {

            const contentToInsert = await resolvePlaceholders(newSnippet.content);        return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');        return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

            await editor.edit((editBuilder: vscode.TextEditorEdit) => {

              editBuilder.insert(editor.selection.active, contentToInsert);      };      };

            });

          } catch {

            // User cancelled placeholder input; do nothing

          }      panel.webview.html = `<!doctype html>      panel.webview.html = `<!doctype html>

        } else if (msg.command === 'run') {

          try {      <html>      <html>

            const commandToRun = await resolvePlaceholders(newSnippet.content);

            const term = vscode.window.activeTerminal ?? vscode.window.createTerminal('Raja Snippets');      <head>      <head>

            term.show(true);

            term.sendText(commandToRun, true);        <meta charset="utf-8" />        <meta charset="utf-8" />

          } catch {

            // User cancelled placeholder input; do nothing        <meta name="viewport" content="width=device-width, initial-scale=1.0" />        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

          }

        } else if (msg.command === 'delete') {        <style>        <style>

          const confirm = await vscode.window.showWarningMessage(`Hapus snippet '${newSnippet.title}'?`, 'Hapus', 'Batal');

          if (confirm === 'Hapus') {          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; padding: 12px; color: var(--vscode-editor-foreground); background: var(--vscode-editor-background); }          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; padding: 12px; color: var(--vscode-editor-foreground); background: var(--vscode-editor-background); }

            await manager.deleteSnippet(newSnippet.id);

            vscode.window.showInformationMessage('Snippet telah dihapus.');          label { display:block; margin-top:8px; font-weight:600 }          label { display:block; margin-top:8px; font-weight:600 }

            treeProvider.refresh();

            panel.dispose();          input[type="text"], textarea, select { width:100%; box-sizing: border-box; padding:8px; margin-top:4px; background: var(--vscode-input-background); color: var(--vscode-input-foreground); border: 1px solid var(--vscode-input-border); }          input[type="text"], textarea, select { width:100%; box-sizing: border-box; padding:8px; margin-top:4px; background: var(--vscode-input-background); color: var(--vscode-input-foreground); border: 1px solid var(--vscode-input-border); }

          }

        }          textarea { min-height: 240px; font-family: monospace; white-space: pre; }          textarea { min-height: 240px; font-family: monospace; white-space: pre; }

      });

          .row { display:flex; gap:8px; margin-top:12px }          .row { display:flex; gap:8px; margin-top:12px }

      panel.onDidDispose(() => msgDisp.dispose());

    }),          button { padding:8px 12px; border-radius:4px; border:none; cursor:pointer; display: flex; align-items: center; gap: 4px; }          button { padding:8px 12px; border-radius:4px; border:none; cursor:pointer; display: flex; align-items: center; gap: 4px; }



    vscode.commands.registerCommand('rajaSnippets.addGroupInline', async () => {          button.save { background: var(--vscode-button-background); color: var(--vscode-button-foreground) }          button.save { background: var(--vscode-button-background); color: var(--vscode-button-foreground) }

      const name = await vscode.window.showInputBox({ prompt: 'Group name' });

      if (!name) { return; }          button.insert { background: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground) }          button.insert { background: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground) }

      await manager.addGroup(name);

      vscode.window.showInformationMessage(`Group '${name}' created.`);          button.run { background: var(--vscode-terminal-background); color: var(--vscode-terminal-foreground) }          button.run { background: var(--vscode-terminal-background); color: var(--vscode-terminal-foreground) }

      treeProvider.refresh();

    }),          button.delete { background: var(--vscode-errorForeground); color: white }          button.delete { background: var(--vscode-errorForeground); color: white }



    vscode.commands.registerCommand('rajaSnippets.deleteGroupFromTree', async (groupItem) => {        </style>        </style>

      const confirm = await vscode.window.showWarningMessage(`Delete group '${groupItem.label}' and all its snippets?`, 'Delete', 'Cancel');

      if (confirm === 'Delete') {      </head>      </head>

        await manager.deleteGroup(groupItem.label);

        vscode.window.showInformationMessage(`Group '${groupItem.label}' deleted.`);      <body>      <body>

        treeProvider.refresh();

      }        <label>Judul</label>        <label>Judul</label>

    })

  );        <input id="title" type="text" value="${escapeHtml(newSnippet.title)}" />        <input id="title" type="text" value="${escapeHtml(newSnippet.title)}" />



  context.subscriptions.push(

    vscode.commands.registerCommand('rajaSnippets.addGroup', async () => {

      const name = await vscode.window.showInputBox({ prompt: 'Group name' });        <label>Content</label>        <label>Content</label>

      if (!name) { return; }

      await manager.addGroup(name);        <textarea id="content">${escapeHtml(newSnippet.content)}</textarea>        <textarea id="content">${escapeHtml(newSnippet.content)}</textarea>

      vscode.window.showInformationMessage(`Group '${name}' created.`);

      treeProvider.refresh();

    }),

        <p style="font-size:11px;margin:0 0 8px 0;color:var(--vscode-descriptionForeground)">        <p style="font-size:11px;margin:0 0 8px 0;color:var(--vscode-descriptionForeground)">

    vscode.commands.registerCommand('rajaSnippets.addSnippet', async () => {

      const editor = vscode.window.activeTextEditor;          Tips: Gunakan placeholder dinamis seperti <code>{$nama}</code> untuk meminta input saat snippet disisipkan/dijalankan.          Tips: Gunakan placeholder dinamis seperti <code>{$nama}</code> untuk meminta input saat snippet disisipkan/dijalankan.

      if (!editor) { vscode.window.showErrorMessage('Open a file and select text to save as snippet'); return; }

      const selection = editor.selection;        </p>        </p>

      const text = editor.document.getText(selection) || editor.document.getText();

      const title = await vscode.window.showInputBox({ prompt: 'Snippet title' });

      if (!title) { return; }

      const group = await manager.pickGroup();        <label>Tipe</label>        <label>Tipe</label>

      if (!group) { return; }

      const type = 'code';  // Default new snippets from editor are code type        <select id="type">        <select id="type">

      await manager.addSnippet(group, title, text, type);

      vscode.window.showInformationMessage(`Snippet '${title}' saved to '${group}'.`);          <option value="code" ${newSnippet.type === 'code' ? 'selected' : ''}>Kode</option>          <option value="code" ${newSnippet.type === 'code' ? 'selected' : ''}>Kode</option>

      treeProvider.refresh();

    }),          <option value="terminal" ${newSnippet.type === 'terminal' ? 'selected' : ''}>Terminal</option>          <option value="terminal" ${newSnippet.type === 'terminal' ? 'selected' : ''}>Terminal</option>



    vscode.commands.registerCommand('rajaSnippets.insertSnippet', async (item) => {        </select>        </select>

      let snippet: SnippetRecord | undefined;

      if (item?.snippet) {

        snippet = item.snippet as SnippetRecord;

      } else {        <label>Group</label>        <label>Group</label>

        // Filter hanya snippet tipe code untuk quick pick

        const codeSnippets = manager.getData().snippets.filter(s => s.type === 'code');        <select id="group">        <select id="group">

        const pick = await vscode.window.showQuickPick(

          codeSnippets.map(s => ({ label: s.title, snippet: s })),          ${manager.getData().groups.map(g => `<option value="${escapeHtml(g)}" ${g === newSnippet.group ? 'selected' : ''}>${escapeHtml(g)}</option>`).join('')}          ${manager.getData().groups.map(g => `<option value="${escapeHtml(g)}" ${g === newSnippet.group ? 'selected' : ''}>${escapeHtml(g)}</option>`).join('')}

          { placeHolder: 'Pilih snippet kode' }

        );        </select>        </select>

        if (!pick) { return; }

        snippet = pick.snippet;

      }

      if (!snippet) { return; }        <div class="row">        <div class="row">

      const editor = vscode.window.activeTextEditor;

      if (!editor) { vscode.window.showErrorMessage('No active editor'); return; }          <button class="save" title="Simpan">💾 Simpan</button>          <button class="save" title="Simpan">💾 Simpan</button>

      const contentToInsert = await resolvePlaceholders(snippet.content);

      await editor.edit((editBuilder: vscode.TextEditorEdit) => {          <button class="insert" title="Sisipkan">📝 Sisipkan</button>          <button class="insert" title="Sisipkan">📝 Sisipkan</button>

        editBuilder.insert(editor.selection.active, contentToInsert);

      });          <button class="run" title="Jalankan">▶️ Jalankan</button>          <button class="run" title="Jalankan">▶️ Jalankan</button>

    }),

          <button class="delete" title="Hapus">🗑️ Hapus</button>          <button class="delete" title="Hapus">🗑️ Hapus</button>

    vscode.commands.registerCommand('rajaSnippets.runSnippet', async (item) => {

      let snippet: SnippetRecord | undefined;        </div>        </div>

      if (item?.snippet) {

        snippet = item.snippet as SnippetRecord;

      } else {

        // Filter hanya snippet tipe terminal untuk quick pick        <script>        <script>

        const terminalSnippets = manager.getData().snippets.filter(s => s.type === 'terminal');

        const pick = await vscode.window.showQuickPick(          const vscode = acquireVsCodeApi();          const vscode = acquireVsCodeApi();

          terminalSnippets.map(s => ({ label: s.title, snippet: s })),

          { placeHolder: 'Pilih perintah terminal' }          document.querySelector('.save').addEventListener('click', () => {          document.querySelector('.save').addEventListener('click', () => {

        );

        if (!pick) { return; }            const title = document.getElementById('title').value;            const title = document.getElementById('title').value;

        snippet = pick.snippet;

      }            const content = document.getElementById('content').value;            const content = document.getElementById('content').value;

      if (!snippet) { return; }

      const term = vscode.window.activeTerminal ?? vscode.window.createTerminal('Raja Snippets');            const type = document.getElementById('type').value;            const type = document.getElementById('type').value;

      term.show(true);

      const commandToRun = await resolvePlaceholders(snippet.content);            const group = document.getElementById('group').value;            const group = document.getElementById('group').value;

      term.sendText(commandToRun, true);

    }),            vscode.postMessage({ command: 'save', title, content, type, group });            vscode.postMessage({ command: 'save', title, content, type, group });



    vscode.commands.registerCommand('rajaSnippets.listSnippets', async () => {          });          });

      const items = manager.listAll();

      const pick = await vscode.window.showQuickPick(items.map((i: SnippetRecord) => ({label: i.title, snippet: i})), {placeHolder: 'Select snippet'});          document.querySelector('.delete').addEventListener('click', () => {          document.querySelector('.delete').addEventListener('click', () => {

      if (!pick) { return; }

      const s = pick.snippet || manager.findByTitle(pick.label);            vscode.postMessage({ command: 'delete' });            vscode.postMessage({ command: 'delete' });

      if (s && vscode.window.activeTextEditor) {

        await vscode.window.activeTextEditor.insertSnippet(new vscode.SnippetString(s.content));          });          });

      }

    }),        </script>        </script>



    vscode.commands.registerCommand('rajaSnippets.editOrDeleteSnippet', async (item) => {      </body>      </body>

      const snippet = item?.snippet;

      if (!snippet) { return; }      </html>`;      </html>`;



      // Create a webview panel to edit the snippet with a small form        return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

      const panel = vscode.window.createWebviewPanel(

        'rajaSnippetEditor',      const msgDisp = panel.webview.onDidReceiveMessage(async (msg) => {      };

        `Edit: ${snippet.title}`,

        vscode.ViewColumn.One,        if (msg.command === 'save') {

        { enableScripts: true }

      );          await manager.updateSnippet(newSnippet.id, { title: msg.title, content: msg.content, type: msg.type, group: msg.group });      panel.webview.html = `<!doctype html>



      const escapeHtml = (s: string) => {          vscode.window.showInformationMessage('Snippet telah disimpan.');      <html>

        return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

      };          treeProvider.refresh();      <head>



      panel.webview.html = `<!doctype html>          panel.dispose();        <meta charset="utf-8" />

      <html>

      <head>        } else if (msg.command === 'insert') {        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta charset="utf-8" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />          const editor = vscode.window.activeTextEditor;        <style>

        <style>

          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; padding: 12px; color: var(--vscode-editor-foreground); background: var(--vscode-editor-background); }          if (!editor) {          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; padding: 12px; color: var(--vscode-editor-foreground); background: var(--vscode-editor-background); }

          label { display:block; margin-top:8px; font-weight:600 }

          input[type="text"], textarea, select { width:100%; box-sizing: border-box; padding:8px; margin-top:4px; background: var(--vscode-input-background); color: var(--vscode-input-foreground); border: 1px solid var(--vscode-input-border); }            vscode.window.showErrorMessage('No active editor');          label { display:block; margin-top:8px; font-weight:600 }

          textarea { min-height: 240px; font-family: monospace; white-space: pre; }

          .row { display:flex; gap:8px; margin-top:12px }            return;          input[type="text"], textarea, select { width:100%; box-sizing: border-box; padding:8px; margin-top:4px; background: var(--vscode-input-background); color: var(--vscode-input-foreground); border: 1px solid var(--vscode-input-border); }

          button { padding:8px 12px; border-radius:4px; border:none; cursor:pointer; display: flex; align-items: center; gap: 4px; }

          button.save { background: var(--vscode-button-background); color: var(--vscode-button-foreground) }          }          textarea { min-height: 240px; font-family: monospace; white-space: pre; }

          button.insert { background: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground) }

          button.run { background: var(--vscode-terminal-background); color: var(--vscode-terminal-foreground) }          try {          .row { display:flex; gap:8px; margin-top:12px }

          button.delete { background: var(--vscode-errorForeground); color: white }

        </style>            const contentToInsert = await resolvePlaceholders(newSnippet.content);          button { padding:8px 12px; border-radius:4px; border:none; cursor:pointer }

      </head>

      <body>            await editor.edit((editBuilder: vscode.TextEditorEdit) => {          button.save { background: var(--vscode-button-background); color: var(--vscode-button-foreground) }

        <label>Judul</label>

        <input id="title" type="text" value="${escapeHtml(snippet.title)}" />              editBuilder.insert(editor.selection.active, contentToInsert);          button.delete { background: var(--vscode-errorForeground); color: white }



        <label>Content</label>            });        </style>

        <textarea id="content">${escapeHtml(snippet.content)}</textarea>

          } catch {      </head>

        <p style="font-size:11px;margin:0 0 8px 0;color:var(--vscode-descriptionForeground)">

          Tips: Gunakan placeholder dinamis seperti <code>{$nama}</code> untuk meminta input saat snippet disisipkan/dijalankan.            // User cancelled placeholder input; do nothing      <body>

        </p>

          }        <label>Judul</label>

        <label>Tipe</label>

        <select id="type">        } else if (msg.command === 'run') {        <input id="title" type="text" value="${escapeHtml(newSnippet.title)}" />

          <option value="code" ${snippet.type === 'code' ? 'selected' : ''}>Kode</option>

          <option value="terminal" ${snippet.type === 'terminal' ? 'selected' : ''}>Terminal</option>          try {

        </select>

            const commandToRun = await resolvePlaceholders(newSnippet.content);        <label>Content</label>

        <label>Group</label>

        <select id="group">            const term = vscode.window.activeTerminal ?? vscode.window.createTerminal('Raja Snippets');        <textarea id="content">${escapeHtml(newSnippet.content)}</textarea>

          ${manager.getData().groups.map(g => `<option value="${escapeHtml(g)}" ${g === snippet.group ? 'selected' : ''}>${escapeHtml(g)}</option>`).join('')}

        </select>            term.show(true);



        <div class="row">            term.sendText(commandToRun, true);        <p style="font-size:11px;margin:0 0 8px 0;color:var(--vscode-descriptionForeground)">

          <button class="save" title="Simpan">💾 Simpan</button>

          <button class="insert" title="Sisipkan">📝 Sisipkan</button>          } catch {          Tips: Gunakan placeholder dinamis seperti <code>{$nama}</code> untuk meminta input saat snippet disisipkan/dijalankan.

          <button class="run" title="Jalankan">▶️ Jalankan</button>

          <button class="delete" title="Hapus">🗑️ Hapus</button>            // User cancelled placeholder input; do nothing        </p>

        </div>

          }

        <script>

          const vscode = acquireVsCodeApi();        } else if (msg.command === 'delete') {        <label>Tipe</label>

          document.querySelector('.save').addEventListener('click', () => {

            const title = document.getElementById('title').value;          const confirm = await vscode.window.showWarningMessage(`Hapus snippet '${newSnippet.title}'?`, 'Hapus', 'Batal');        <select id="type">

            const content = document.getElementById('content').value;

            const type = document.getElementById('type').value;          if (confirm === 'Hapus') {          <option value="code" ${newSnippet.type === 'code' ? 'selected' : ''}>Kode</option>

            const group = document.getElementById('group').value;

            vscode.postMessage({ command: 'save', title, content, type, group });            await manager.deleteSnippet(newSnippet.id);          <option value="terminal" ${newSnippet.type === 'terminal' ? 'selected' : ''}>Terminal</option>

          });

          document.querySelector('.insert').addEventListener('click', () => {            vscode.window.showInformationMessage('Snippet telah dihapus.');        </select>

            vscode.postMessage({ command: 'insert' });

          });            treeProvider.refresh();

          document.querySelector('.run').addEventListener('click', () => {

            vscode.postMessage({ command: 'run' });            panel.dispose();        <label>Group</label>

          });

          document.querySelector('.delete').addEventListener('click', () => {          }        <select id="group">

            vscode.postMessage({ command: 'delete' });

          });        }          ${manager.getData().groups.map(g => `<option value="${escapeHtml(g)}" ${g === newSnippet.group ? 'selected' : ''}>${escapeHtml(g)}</option>`).join('')}

        </script>

      </body>      });        </select>

      </html>`;



      const msgDisp = panel.webview.onDidReceiveMessage(async (msg) => {

        if (msg.command === 'save') {      panel.onDidDispose(() => msgDisp.dispose());        <div class="row">

          await manager.updateSnippet(snippet.id, { title: msg.title, content: msg.content, type: msg.type, group: msg.group });

          vscode.window.showInformationMessage('Snippet telah diperbarui.');    }),          <button class="save" title="Simpan">💾 Simpan</button>

          treeProvider.refresh();

          panel.dispose();          <button class="insert" title="Sisipkan">📝 Sisipkan</button>

        } else if (msg.command === 'insert') {

          const editor = vscode.window.activeTextEditor;    vscode.commands.registerCommand('rajaSnippets.addGroupInline', async () => {          <button class="run" title="Jalankan">▶️ Jalankan</button>

          if (!editor) {

            vscode.window.showErrorMessage('No active editor');      const name = await vscode.window.showInputBox({ prompt: 'Group name' });          <button class="delete" title="Hapus">🗑️ Hapus</button>

            return;

          }      if (!name) { return; }        </div>

          try {

            const contentToInsert = await resolvePlaceholders(snippet.content);      await manager.addGroup(name);

            await editor.edit((editBuilder: vscode.TextEditorEdit) => {

              editBuilder.insert(editor.selection.active, contentToInsert);      vscode.window.showInformationMessage(`Group '${name}' created.`);        <script>

            });

          } catch {      treeProvider.refresh();          const vscode = acquireVsCodeApi();

            // User cancelled placeholder input; do nothing

          }    }),          document.querySelector('.save').addEventListener('click', () => {

        } else if (msg.command === 'run') {

          try {            const title = document.getElementById('title').value;

            const commandToRun = await resolvePlaceholders(snippet.content);

            const term = vscode.window.activeTerminal ?? vscode.window.createTerminal('Raja Snippets');    vscode.commands.registerCommand('rajaSnippets.deleteGroupFromTree', async (groupItem) => {            const content = document.getElementById('content').value;

            term.show(true);

            term.sendText(commandToRun, true);      const confirm = await vscode.window.showWarningMessage(`Delete group '${groupItem.label}' and all its snippets?`, 'Delete', 'Cancel');            const type = document.getElementById('type').value;

          } catch {

            // User cancelled placeholder input; do nothing      if (confirm === 'Delete') {            const group = document.getElementById('group').value;

          }

        } else if (msg.command === 'delete') {        await manager.deleteGroup(groupItem.label);            vscode.postMessage({ command: 'save', title, content, type, group });

          const confirm = await vscode.window.showWarningMessage(`Hapus snippet '${snippet.title}'?`, 'Hapus', 'Batal');

          if (confirm === 'Hapus') {        vscode.window.showInformationMessage(`Group '${groupItem.label}' deleted.`);          });

            await manager.deleteSnippet(snippet.id);

            vscode.window.showInformationMessage('Snippet telah dihapus.');        treeProvider.refresh();          document.querySelector('.delete').addEventListener('click', () => {

            treeProvider.refresh();

            panel.dispose();      }            vscode.postMessage({ command: 'delete' });

          }

        }    })          });

      });

  );        </script>

      panel.onDidDispose(() => msgDisp.dispose());

    }),      </body>



    vscode.commands.registerCommand('rajaSnippets.changeSnippetType', async (item) => {  context.subscriptions.push(      </html>`;

      const snippet = item?.snippet;

      if (!snippet) { return; }    vscode.commands.registerCommand('rajaSnippets.addGroup', async () => {



      const newType = await vscode.window.showQuickPick(      const name = await vscode.window.showInputBox({ prompt: 'Group name' });      const msgDisp = panel.webview.onDidReceiveMessage(async (msg) => {

        [

          { label: '$(code) Snippet Kode', value: 'code' },      if (!name) { return; }        if (msg.command === 'save') {

          { label: '$(terminal) Perintah Terminal', value: 'terminal' }

        ],      await manager.addGroup(name);          await manager.updateSnippet(newSnippet.id, { title: msg.title, content: msg.content, type: msg.type, group: msg.group });

        { placeHolder: 'Pilih tipe snippet' }

      );      vscode.window.showInformationMessage(`Group '${name}' created.`);          vscode.window.showInformationMessage('Snippet telah disimpan.');

      

      if (newType && newType.value !== snippet.type) {      treeProvider.refresh();          treeProvider.refresh();

        await manager.updateSnippet(snippet.id, { type: newType.value as 'code' | 'terminal' });

        vscode.window.showInformationMessage('Tipe snippet telah diperbarui.');    }),          panel.dispose();

        treeProvider.refresh();

      }        } else if (msg.command === 'insert') {

    }),

    vscode.commands.registerCommand('rajaSnippets.addSnippet', async () => {          const editor = vscode.window.activeTextEditor;

    // Show snippet actions as a QuickPick (clickable icons) — alternative to inline hover-icons

    vscode.commands.registerCommand('rajaSnippets.showSnippetActions', async (item) => {      const editor = vscode.window.activeTextEditor;          if (!editor) {

      const snippet = item?.snippet as SnippetRecord | undefined;

      if (!snippet) { return; }      if (!editor) { vscode.window.showErrorMessage('Open a file and select text to save as snippet'); return; }            vscode.window.showErrorMessage('No active editor');



      const picks = [      const selection = editor.selection;            return;

        { label: '$(insert) Sisipkan', description: 'Sisipkan snippet pada kursor', action: 'insert' },

        { label: '$(terminal) Jalankan', description: 'Jalankan di terminal', action: 'run' },      const text = editor.document.getText(selection) || editor.document.getText();          }

        { label: '$(edit) Edit', description: 'Edit snippet', action: 'edit' },

        { label: '$(trash) Hapus', description: 'Hapus snippet', action: 'delete' }      const title = await vscode.window.showInputBox({ prompt: 'Snippet title' });          try {

      ] as Array<vscode.QuickPickItem & { action: string }>;

      if (!title) { return; }            const contentToInsert = await resolvePlaceholders(newSnippet.content);

      const pick = await vscode.window.showQuickPick(picks, { placeHolder: 'Pilih aksi untuk snippet' });

      if (!pick) { return; }      const group = await manager.pickGroup();            await editor.edit((editBuilder: vscode.TextEditorEdit) => {



      switch (pick.action) {      if (!group) { return; }              editBuilder.insert(editor.selection.active, contentToInsert);

        case 'insert':

          await vscode.commands.executeCommand('rajaSnippets.insertSnippet', { snippet });      const type = 'code';  // Default new snippets from editor are code type            });

          break;

        case 'run':      await manager.addSnippet(group, title, text, type);          } catch {

          await vscode.commands.executeCommand('rajaSnippets.runSnippet', { snippet });

          break;      vscode.window.showInformationMessage(`Snippet '${title}' saved to '${group}'.`);            // User cancelled placeholder input; do nothing

        case 'edit':

          await vscode.commands.executeCommand('rajaSnippets.editOrDeleteSnippet', { snippet });      treeProvider.refresh();          }

          break;

        case 'delete':    }),        } else if (msg.command === 'run') {

          const confirm = await vscode.window.showWarningMessage(`Hapus snippet '${snippet.title}'?`, 'Hapus', 'Batal');

          if (confirm === 'Hapus') {          try {

            await manager.deleteSnippet(snippet.id);

            vscode.window.showInformationMessage('Snippet telah dihapus.');    vscode.commands.registerCommand('rajaSnippets.insertSnippet', async (item) => {            const commandToRun = await resolvePlaceholders(newSnippet.content);

            treeProvider.refresh();

          }      let snippet: SnippetRecord | undefined;            const term = vscode.window.activeTerminal ?? vscode.window.createTerminal('Raja Snippets');

          break;

      }      if (item?.snippet) {            term.show(true);

    }),

        snippet = item.snippet as SnippetRecord;            term.sendText(commandToRun, true);

    vscode.commands.registerCommand('rajaSnippets.deleteGroup', async () => {

      const group = await manager.pickGroup();      } else {          } catch {

      if (!group) { return; }

      const confirm = await vscode.window.showWarningMessage(`Delete group '${group}' and all its snippets?`, 'Delete', 'Cancel');        // Filter hanya snippet tipe code untuk quick pick            // User cancelled placeholder input; do nothing

      if (confirm === 'Delete') {

        await manager.deleteGroup(group);        const codeSnippets = manager.getData().snippets.filter(s => s.type === 'code');          }

        vscode.window.showInformationMessage(`Group '${group}' deleted.`);

        treeProvider.refresh();        const pick = await vscode.window.showQuickPick(        } else if (msg.command === 'delete') {

      }

    }),          codeSnippets.map(s => ({ label: s.title, snippet: s })),          const confirm = await vscode.window.showWarningMessage(`Hapus snippet '${newSnippet.title}'?`, 'Hapus', 'Batal');



    vscode.commands.registerCommand('rajaSnippets.deleteSnippet', async (item) => {          { placeHolder: 'Pilih snippet kode' }          if (confirm === 'Hapus') {

      const snippet = item?.snippet;

      if (!snippet) { return; }        );            await manager.deleteSnippet(newSnippet.id);



      const confirm = await vscode.window.showWarningMessage(        if (!pick) { return; }            vscode.window.showInformationMessage('Snippet telah dihapus.');

        `Hapus snippet '${snippet.title}'?`,

        'Hapus',        snippet = pick.snippet;            treeProvider.refresh();

        'Batal'

      );      }            panel.dispose();



      if (confirm === 'Hapus') {      if (!snippet) { return; }          }

        await manager.deleteSnippet(snippet.id);

        vscode.window.showInformationMessage('Snippet telah dihapus.');      const editor = vscode.window.activeTextEditor;        }

        treeProvider.refresh();

      }      if (!editor) { vscode.window.showErrorMessage('No active editor'); return; }      });

    }),

      const contentToInsert = await resolvePlaceholders(snippet.content);

    vscode.commands.registerCommand('rajaSnippets.exportJson', async () => {

      const json = manager.exportAsJson();      await editor.edit((editBuilder: vscode.TextEditorEdit) => {      panel.onDidDispose(() => msgDisp.dispose());

      const uri = await vscode.window.showSaveDialog({ filters: { JSON: ['json'] }, defaultUri: vscode.Uri.file('snippets.json') });

      if (!uri) { return; }        editBuilder.insert(editor.selection.active, contentToInsert);    }),

      const encoder = new TextEncoder();

      await vscode.workspace.fs.writeFile(uri, encoder.encode(json));      });

      vscode.window.showInformationMessage('Snippet berhasil diekspor.');

    }),    }),    vscode.commands.registerCommand('rajaSnippets.addGroupInline', async () => {



    vscode.commands.registerCommand('rajaSnippets.importJson', async () => {      const name = await vscode.window.showInputBox({ prompt: 'Group name' });

      const uri = await vscode.window.showOpenDialog({ canSelectMany: false, filters: { JSON: ['json'] } });

      if (!uri) { return; }    vscode.commands.registerCommand('rajaSnippets.runSnippet', async (item) => {      if (!name) { return; }

      const bytes = await vscode.workspace.fs.readFile(uri[0]);

      const decoder = new TextDecoder();      let snippet: SnippetRecord | undefined;      await manager.addGroup(name);

      const json = decoder.decode(bytes);

      try {      if (item?.snippet) {      vscode.window.showInformationMessage(`Group '${name}' created.`);

        await manager.importFromJson(json);

        vscode.window.showInformationMessage('Snippet berhasil diimpor.');        snippet = item.snippet as SnippetRecord;      treeProvider.refresh();

        treeProvider.refresh();

      } catch (e) {      } else {    }),

        vscode.window.showErrorMessage('Impor gagal. Format JSON tidak valid.');

      }        // Filter hanya snippet tipe terminal untuk quick pick

    })

  );        const terminalSnippets = manager.getData().snippets.filter(s => s.type === 'terminal');    vscode.commands.registerCommand('rajaSnippets.deleteGroupFromTree', async (groupItem) => {



  // New storage commands        const pick = await vscode.window.showQuickPick(      const confirm = await vscode.window.showWarningMessage(`Delete group '${groupItem.label}' and all its snippets?`, 'Delete', 'Cancel');

  context.subscriptions.push(

    vscode.commands.registerCommand('rajaSnippets.openStorage', async () => {          terminalSnippets.map(s => ({ label: s.title, snippet: s })),      if (confirm === 'Delete') {

      await manager.openStorage();

    }),          { placeHolder: 'Pilih perintah terminal' }        await manager.deleteGroup(groupItem.label);



    vscode.commands.registerCommand('rajaSnippets.showStoragePath', async () => {        );        vscode.window.showInformationMessage(`Group '${groupItem.label}' deleted.`);

      const p = manager.getDataFilePath();

      vscode.window.showInformationMessage(`Snippets storage: ${p}`);        if (!pick) { return; }        treeProvider.refresh();

    }),

        snippet = pick.snippet;      }

    vscode.commands.registerCommand('rajaSnippets.configureStorage', async () => {

      const uri = await vscode.window.showOpenDialog({ canSelectFolders: true, canSelectFiles: false, canSelectMany: false, openLabel: 'Pilih folder untuk menyimpan snippets' });      }    })

      if (!uri || uri.length === 0) { return; }

      const folder = uri[0].fsPath;      if (!snippet) { return; }  );

      await manager.setStoragePath(folder);

      vscode.window.showInformationMessage(`Snippets storage diset ke: ${folder}`);      const term = vscode.window.activeTerminal ?? vscode.window.createTerminal('Raja Snippets');

      treeProvider.refresh();

    })      term.show(true);  context.subscriptions.push(

  );

}      const commandToRun = await resolvePlaceholders(snippet.content);    vscode.commands.registerCommand('rajaSnippets.addGroup', async () => {



export function deactivate() {}      term.sendText(commandToRun, true);      const name = await vscode.window.showInputBox({ prompt: 'Group name' });

    }),      if (!name) { return; }

      await manager.addGroup(name);

    vscode.commands.registerCommand('rajaSnippets.listSnippets', async () => {      vscode.window.showInformationMessage(`Group '${name}' created.`);

      const items = manager.listAll();      treeProvider.refresh();

      const pick = await vscode.window.showQuickPick(items.map((i: SnippetRecord) => ({label: i.title, snippet: i})), {placeHolder: 'Select snippet'});    }),

      if (!pick) { return; }

      const s = pick.snippet || manager.findByTitle(pick.label);    vscode.commands.registerCommand('rajaSnippets.addSnippet', async () => {

      if (s && vscode.window.activeTextEditor) {      const editor = vscode.window.activeTextEditor;

        await vscode.window.activeTextEditor.insertSnippet(new vscode.SnippetString(s.content));      if (!editor) { vscode.window.showErrorMessage('Open a file and select text to save as snippet'); return; }

      }      const selection = editor.selection;

    }),      const text = editor.document.getText(selection) || editor.document.getText();

      const title = await vscode.window.showInputBox({ prompt: 'Snippet title' });

    vscode.commands.registerCommand('rajaSnippets.editOrDeleteSnippet', async (item) => {      if (!title) { return; }

      const snippet = item?.snippet;      const group = await manager.pickGroup();

      if (!snippet) { return; }      if (!group) { return; }

      const type = 'code';  // Default new snippets from editor are code type

      // Create a webview panel to edit the snippet with a small form      await manager.addSnippet(group, title, text, type);

      const panel = vscode.window.createWebviewPanel(      vscode.window.showInformationMessage(`Snippet '${title}' saved to '${group}'.`);

        'rajaSnippetEditor',      treeProvider.refresh();

        `Edit: ${snippet.title}`,    }),

        vscode.ViewColumn.One,

        { enableScripts: true }    vscode.commands.registerCommand('rajaSnippets.insertSnippet', async (item) => {

      );      let snippet: SnippetRecord | undefined;

      if (item?.snippet) {

      const escapeHtml = (s: string) => {        snippet = item.snippet as SnippetRecord;

        return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');      } else {

      };        // Filter hanya snippet tipe code untuk quick pick

        const codeSnippets = manager.getData().snippets.filter(s => s.type === 'code');

      panel.webview.html = `<!doctype html>        const pick = await vscode.window.showQuickPick(

      <html>          codeSnippets.map(s => ({ label: s.title, snippet: s })),

      <head>          { placeHolder: 'Pilih snippet kode' }

        <meta charset="utf-8" />        );

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />        if (!pick) { return; }

        <style>        snippet = pick.snippet;

          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; padding: 12px; color: var(--vscode-editor-foreground); background: var(--vscode-editor-background); }      }

          label { display:block; margin-top:8px; font-weight:600 }      if (!snippet) { return; }

          input[type="text"], textarea, select { width:100%; box-sizing: border-box; padding:8px; margin-top:4px; background: var(--vscode-input-background); color: var(--vscode-input-foreground); border: 1px solid var(--vscode-input-border); }      const editor = vscode.window.activeTextEditor;

          textarea { min-height: 240px; font-family: monospace; white-space: pre; }      if (!editor) { vscode.window.showErrorMessage('No active editor'); return; }

          .row { display:flex; gap:8px; margin-top:12px }      const contentToInsert = await resolvePlaceholders(snippet.content);

          button { padding:8px 12px; border-radius:4px; border:none; cursor:pointer; display: flex; align-items: center; gap: 4px; }      await editor.edit((editBuilder: vscode.TextEditorEdit) => {

          button.save { background: var(--vscode-button-background); color: var(--vscode-button-foreground) }        editBuilder.insert(editor.selection.active, contentToInsert);

          button.insert { background: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground) }      });

          button.run { background: var(--vscode-terminal-background); color: var(--vscode-terminal-foreground) }    }),

          button.delete { background: var(--vscode-errorForeground); color: white }

        </style>    vscode.commands.registerCommand('rajaSnippets.runSnippet', async (item) => {

      </head>      let snippet: SnippetRecord | undefined;

      <body>      if (item?.snippet) {

        <label>Judul</label>        snippet = item.snippet as SnippetRecord;

        <input id="title" type="text" value="${escapeHtml(snippet.title)}" />      } else {

        // Filter hanya snippet tipe terminal untuk quick pick

        <label>Content</label>        const terminalSnippets = manager.getData().snippets.filter(s => s.type === 'terminal');

        <textarea id="content">${escapeHtml(snippet.content)}</textarea>        const pick = await vscode.window.showQuickPick(

          terminalSnippets.map(s => ({ label: s.title, snippet: s })),

        <p style="font-size:11px;margin:0 0 8px 0;color:var(--vscode-descriptionForeground)">          { placeHolder: 'Pilih perintah terminal' }

          Tips: Gunakan placeholder dinamis seperti <code>{$nama}</code> untuk meminta input saat snippet disisipkan/dijalankan.        );

        </p>        if (!pick) { return; }

        snippet = pick.snippet;

        <label>Tipe</label>      }

        <select id="type">      if (!snippet) { return; }

          <option value="code" ${snippet.type === 'code' ? 'selected' : ''}>Kode</option>      const term = vscode.window.activeTerminal ?? vscode.window.createTerminal('Raja Snippets');

          <option value="terminal" ${snippet.type === 'terminal' ? 'selected' : ''}>Terminal</option>      term.show(true);

        </select>      const commandToRun = await resolvePlaceholders(snippet.content);

      term.sendText(commandToRun, true);

        <label>Group</label>    }),

        <select id="group">

          ${manager.getData().groups.map(g => `<option value="${escapeHtml(g)}" ${g === snippet.group ? 'selected' : ''}>${escapeHtml(g)}</option>`).join('')}    vscode.commands.registerCommand('rajaSnippets.listSnippets', async () => {

        </select>      const items = manager.listAll();

      const pick = await vscode.window.showQuickPick(items.map((i: SnippetRecord) => ({label: i.title, snippet: i})), {placeHolder: 'Select snippet'});

        <div class="row">      if (!pick) { return; }

          <button class="save" title="Simpan">💾 Simpan</button>      const s = pick.snippet || manager.findByTitle(pick.label);

          <button class="insert" title="Sisipkan">📝 Sisipkan</button>      if (s && vscode.window.activeTextEditor) {

          <button class="run" title="Jalankan">▶️ Jalankan</button>        await vscode.window.activeTextEditor.insertSnippet(new vscode.SnippetString(s.content));

          <button class="delete" title="Hapus">🗑️ Hapus</button>      }

        </div>    }),



        <script>    vscode.commands.registerCommand('rajaSnippets.editOrDeleteSnippet', async (item) => {

          const vscode = acquireVsCodeApi();      const snippet = item?.snippet;

          document.querySelector('.save').addEventListener('click', () => {      if (!snippet) { return; }

            const title = document.getElementById('title').value;

            const content = document.getElementById('content').value;      // Create a webview panel to edit the snippet with a small form

            const type = document.getElementById('type').value;      const panel = vscode.window.createWebviewPanel(

            const group = document.getElementById('group').value;        'rajaSnippetEditor',

            vscode.postMessage({ command: 'save', title, content, type, group });        `Edit: ${snippet.title}`,

          });        vscode.ViewColumn.One,

          document.querySelector('.insert').addEventListener('click', () => {        { enableScripts: true }

            vscode.postMessage({ command: 'insert' });      );

          });

          document.querySelector('.run').addEventListener('click', () => {      const escapeHtml = (s: string) => {

            vscode.postMessage({ command: 'run' });        return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

          });      };

          document.querySelector('.delete').addEventListener('click', () => {

            vscode.postMessage({ command: 'delete' });      panel.webview.html = `<!doctype html>

          });      <html>

        </script>      <head>

      </body>        <meta charset="utf-8" />

      </html>`;        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <style>

      const msgDisp = panel.webview.onDidReceiveMessage(async (msg) => {          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; padding: 12px; color: var(--vscode-editor-foreground); background: var(--vscode-editor-background); }

        if (msg.command === 'save') {          label { display:block; margin-top:8px; font-weight:600 }

          await manager.updateSnippet(snippet.id, { title: msg.title, content: msg.content, type: msg.type, group: msg.group });          input[type="text"], textarea, select { width:100%; box-sizing: border-box; padding:8px; margin-top:4px; background: var(--vscode-input-background); color: var(--vscode-input-foreground); border: 1px solid var(--vscode-input-border); }

          vscode.window.showInformationMessage('Snippet telah diperbarui.');          textarea { min-height: 240px; font-family: monospace; white-space: pre; }

          treeProvider.refresh();          .row { display:flex; gap:8px; margin-top:12px }

          panel.dispose();          button { padding:8px 12px; border-radius:4px; border:none; cursor:pointer }

        } else if (msg.command === 'insert') {          button.save { background: var(--vscode-button-background); color: var(--vscode-button-foreground) }

          const editor = vscode.window.activeTextEditor;          button.delete { background: var(--vscode-errorForeground); color: white }

          if (!editor) {        </style>

            vscode.window.showErrorMessage('No active editor');      </head>

            return;      <body>

          }        <label>Judul</label>

          try {        <input id="title" type="text" value="${escapeHtml(snippet.title)}" />

            const contentToInsert = await resolvePlaceholders(snippet.content);

            await editor.edit((editBuilder: vscode.TextEditorEdit) => {        <label>Content</label>

              editBuilder.insert(editor.selection.active, contentToInsert);        <textarea id="content">${escapeHtml(snippet.content)}</textarea>

            });

          } catch {        <p style="font-size:11px;margin:0 0 8px 0;color:var(--vscode-descriptionForeground)">

            // User cancelled placeholder input; do nothing          Tips: Gunakan placeholder dinamis seperti <code>{$nama}</code> untuk meminta input saat snippet disisipkan/dijalankan.

          }        </p>

        } else if (msg.command === 'run') {

          try {        <label>Tipe</label>

            const commandToRun = await resolvePlaceholders(snippet.content);        <select id="type">

            const term = vscode.window.activeTerminal ?? vscode.window.createTerminal('Raja Snippets');          <option value="code" ${snippet.type === 'code' ? 'selected' : ''}>Kode</option>

            term.show(true);          <option value="terminal" ${snippet.type === 'terminal' ? 'selected' : ''}>Terminal</option>

            term.sendText(commandToRun, true);        </select>

          } catch {

            // User cancelled placeholder input; do nothing        <label>Group</label>

          }        <select id="group">

        } else if (msg.command === 'delete') {          ${manager.getData().groups.map(g => `<option value="${escapeHtml(g)}" ${g === snippet.group ? 'selected' : ''}>${escapeHtml(g)}</option>`).join('')}

          const confirm = await vscode.window.showWarningMessage(`Hapus snippet '${snippet.title}'?`, 'Hapus', 'Batal');        </select>

          if (confirm === 'Hapus') {

            await manager.deleteSnippet(snippet.id);        <div class="row">

            vscode.window.showInformationMessage('Snippet telah dihapus.');          <button class="save" title="Simpan">💾 Simpan</button>

            treeProvider.refresh();          <button class="insert" title="Sisipkan">📝 Sisipkan</button>

            panel.dispose();          <button class="run" title="Jalankan">▶️ Jalankan</button>

          }          <button class="delete" title="Hapus">🗑️ Hapus</button>

        }        </div>

      });

        <script>

      panel.onDidDispose(() => msgDisp.dispose());          const vscode = acquireVsCodeApi();

    }),          document.querySelector('.save').addEventListener('click', () => {

            const title = document.getElementById('title').value;

    vscode.commands.registerCommand('rajaSnippets.changeSnippetType', async (item) => {            const content = document.getElementById('content').value;

      const snippet = item?.snippet;            const type = document.getElementById('type').value;

      if (!snippet) { return; }            const group = document.getElementById('group').value;

            vscode.postMessage({ command: 'save', title, content, type, group });

      const newType = await vscode.window.showQuickPick(          });

        [          document.querySelector('.insert').addEventListener('click', () => {

          { label: '$(code) Snippet Kode', value: 'code' },            vscode.postMessage({ command: 'insert' });

          { label: '$(terminal) Perintah Terminal', value: 'terminal' }          });

        ],          document.querySelector('.run').addEventListener('click', () => {

        { placeHolder: 'Pilih tipe snippet' }            vscode.postMessage({ command: 'run' });

      );          });

                document.querySelector('.delete').addEventListener('click', () => {

      if (newType && newType.value !== snippet.type) {            vscode.postMessage({ command: 'delete' });

        await manager.updateSnippet(snippet.id, { type: newType.value as 'code' | 'terminal' });          });

        vscode.window.showInformationMessage('Tipe snippet telah diperbarui.');        </script>

        treeProvider.refresh();      </body>

      }      </html>`;

    }),

      const msgDisp = panel.webview.onDidReceiveMessage(async (msg) => {

    // Show snippet actions as a QuickPick (clickable icons) — alternative to inline hover-icons        if (msg.command === 'save') {

    vscode.commands.registerCommand('rajaSnippets.showSnippetActions', async (item) => {          await manager.updateSnippet(snippet.id, { title: msg.title, content: msg.content, type: msg.type, group: msg.group });

      const snippet = item?.snippet as SnippetRecord | undefined;          vscode.window.showInformationMessage('Snippet telah diperbarui.');

      if (!snippet) { return; }          treeProvider.refresh();

          panel.dispose();

      const picks = [        } else if (msg.command === 'insert') {

        { label: '$(insert) Sisipkan', description: 'Sisipkan snippet pada kursor', action: 'insert' },          const editor = vscode.window.activeTextEditor;

        { label: '$(terminal) Jalankan', description: 'Jalankan di terminal', action: 'run' },          if (!editor) {

        { label: '$(edit) Edit', description: 'Edit snippet', action: 'edit' },            vscode.window.showErrorMessage('No active editor');

        { label: '$(trash) Hapus', description: 'Hapus snippet', action: 'delete' }            return;

      ] as Array<vscode.QuickPickItem & { action: string }>;          }

          try {

      const pick = await vscode.window.showQuickPick(picks, { placeHolder: 'Pilih aksi untuk snippet' });            const contentToInsert = await resolvePlaceholders(snippet.content);

      if (!pick) { return; }            await editor.edit((editBuilder: vscode.TextEditorEdit) => {

              editBuilder.insert(editor.selection.active, contentToInsert);

      switch (pick.action) {            });

        case 'insert':          } catch {

          await vscode.commands.executeCommand('rajaSnippets.insertSnippet', { snippet });            // User cancelled placeholder input; do nothing

          break;          }

        case 'run':        } else if (msg.command === 'run') {

          await vscode.commands.executeCommand('rajaSnippets.runSnippet', { snippet });          try {

          break;            const commandToRun = await resolvePlaceholders(snippet.content);

        case 'edit':            const term = vscode.window.activeTerminal ?? vscode.window.createTerminal('Raja Snippets');

          await vscode.commands.executeCommand('rajaSnippets.editOrDeleteSnippet', { snippet });            term.show(true);

          break;            term.sendText(commandToRun, true);

        case 'delete':          } catch {

          const confirm = await vscode.window.showWarningMessage(`Hapus snippet '${snippet.title}'?`, 'Hapus', 'Batal');            // User cancelled placeholder input; do nothing

          if (confirm === 'Hapus') {          }

            await manager.deleteSnippet(snippet.id);        } else if (msg.command === 'delete') {

            vscode.window.showInformationMessage('Snippet telah dihapus.');          const confirm = await vscode.window.showWarningMessage(`Hapus snippet '${snippet.title}'?`, 'Hapus', 'Batal');

            treeProvider.refresh();          if (confirm === 'Hapus') {

          }            await manager.deleteSnippet(snippet.id);

          break;            vscode.window.showInformationMessage('Snippet telah dihapus.');

      }            treeProvider.refresh();

    }),            panel.dispose();

          }

    vscode.commands.registerCommand('rajaSnippets.deleteGroup', async () => {        }

      const group = await manager.pickGroup();      });

      if (!group) { return; }

      const confirm = await vscode.window.showWarningMessage(`Delete group '${group}' and all its snippets?`, 'Delete', 'Cancel');      panel.onDidDispose(() => msgDisp.dispose());

      if (confirm === 'Delete') {    }),

        await manager.deleteGroup(group);

        vscode.window.showInformationMessage(`Group '${group}' deleted.`);    vscode.commands.registerCommand('rajaSnippets.changeSnippetType', async (item) => {

        treeProvider.refresh();      const snippet = item?.snippet;

      }      if (!snippet) { return; }

    }),

      const newType = await vscode.window.showQuickPick(

    vscode.commands.registerCommand('rajaSnippets.deleteSnippet', async (item) => {        [

      const snippet = item?.snippet;          { label: '$(code) Snippet Kode', value: 'code' },

      if (!snippet) { return; }          { label: '$(terminal) Perintah Terminal', value: 'terminal' }

        ],

      const confirm = await vscode.window.showWarningMessage(        { placeHolder: 'Pilih tipe snippet' }

        `Hapus snippet '${snippet.title}'?`,      );

        'Hapus',      

        'Batal'      if (newType && newType.value !== snippet.type) {

      );        await manager.updateSnippet(snippet.id, { type: newType.value as 'code' | 'terminal' });

        vscode.window.showInformationMessage('Tipe snippet telah diperbarui.');

      if (confirm === 'Hapus') {        treeProvider.refresh();

        await manager.deleteSnippet(snippet.id);      }

        vscode.window.showInformationMessage('Snippet telah dihapus.');    }),

        treeProvider.refresh();

      }    // Show snippet actions as a QuickPick (clickable icons) — alternative to inline hover-icons

    }),    vscode.commands.registerCommand('rajaSnippets.showSnippetActions', async (item) => {

      const snippet = item?.snippet as SnippetRecord | undefined;

    vscode.commands.registerCommand('rajaSnippets.exportJson', async () => {      if (!snippet) { return; }

      const json = manager.exportAsJson();

      const uri = await vscode.window.showSaveDialog({ filters: { JSON: ['json'] }, defaultUri: vscode.Uri.file('snippets.json') });      const picks = [

      if (!uri) { return; }        { label: '$(insert) Sisipkan', description: 'Sisipkan snippet pada kursor', action: 'insert' },

      const encoder = new TextEncoder();        { label: '$(terminal) Jalankan', description: 'Jalankan di terminal', action: 'run' },

      await vscode.workspace.fs.writeFile(uri, encoder.encode(json));        { label: '$(edit) Edit', description: 'Edit snippet', action: 'edit' },

      vscode.window.showInformationMessage('Snippet berhasil diekspor.');        { label: '$(trash) Hapus', description: 'Hapus snippet', action: 'delete' }

    }),      ] as Array<vscode.QuickPickItem & { action: string }>;



    vscode.commands.registerCommand('rajaSnippets.importJson', async () => {      const pick = await vscode.window.showQuickPick(picks, { placeHolder: 'Pilih aksi untuk snippet' });

      const uri = await vscode.window.showOpenDialog({ canSelectMany: false, filters: { JSON: ['json'] } });      if (!pick) { return; }

      if (!uri) { return; }

      const bytes = await vscode.workspace.fs.readFile(uri[0]);      switch (pick.action) {

      const decoder = new TextDecoder();        case 'insert':

      const json = decoder.decode(bytes);          await vscode.commands.executeCommand('rajaSnippets.insertSnippet', { snippet });

      try {          break;

        await manager.importFromJson(json);        case 'run':

        vscode.window.showInformationMessage('Snippet berhasil diimpor.');          await vscode.commands.executeCommand('rajaSnippets.runSnippet', { snippet });

        treeProvider.refresh();          break;

      } catch (e) {        case 'edit':

        vscode.window.showErrorMessage('Impor gagal. Format JSON tidak valid.');          await vscode.commands.executeCommand('rajaSnippets.editOrDeleteSnippet', { snippet });

      }          break;

    })        case 'delete':

  );          const confirm = await vscode.window.showWarningMessage(`Hapus snippet '${snippet.title}'?`, 'Hapus', 'Batal');

          if (confirm === 'Hapus') {

  // New storage commands            await manager.deleteSnippet(snippet.id);

  context.subscriptions.push(            vscode.window.showInformationMessage('Snippet telah dihapus.');

    vscode.commands.registerCommand('rajaSnippets.openStorage', async () => {            treeProvider.refresh();

      await manager.openStorage();          }

    }),          break;

      }

    vscode.commands.registerCommand('rajaSnippets.showStoragePath', async () => {    }),

      const p = manager.getDataFilePath();

      vscode.window.showInformationMessage(`Snippets storage: ${p}`);    vscode.commands.registerCommand('rajaSnippets.deleteGroup', async () => {

    }),      const group = await manager.pickGroup();

      if (!group) { return; }

    vscode.commands.registerCommand('rajaSnippets.configureStorage', async () => {      const confirm = await vscode.window.showWarningMessage(`Delete group '${group}' and all its snippets?`, 'Delete', 'Cancel');

      const uri = await vscode.window.showOpenDialog({ canSelectFolders: true, canSelectFiles: false, canSelectMany: false, openLabel: 'Pilih folder untuk menyimpan snippets' });      if (confirm === 'Delete') {

      if (!uri || uri.length === 0) { return; }        await manager.deleteGroup(group);

      const folder = uri[0].fsPath;        vscode.window.showInformationMessage(`Group '${group}' deleted.`);

      await manager.setStoragePath(folder);        treeProvider.refresh();

      vscode.window.showInformationMessage(`Snippets storage diset ke: ${folder}`);      }

      treeProvider.refresh();    }),

    })

  );    vscode.commands.registerCommand('rajaSnippets.deleteSnippet', async (item) => {

}      const snippet = item?.snippet;

      if (!snippet) { return; }

export function deactivate() {}
      const confirm = await vscode.window.showWarningMessage(
        `Hapus snippet '${snippet.title}'?`,
        'Hapus',
        'Batal'
      );

      if (confirm === 'Hapus') {
        await manager.deleteSnippet(snippet.id);
        vscode.window.showInformationMessage('Snippet telah dihapus.');
        treeProvider.refresh();
      }
    }),

    vscode.commands.registerCommand('rajaSnippets.exportJson', async () => {
      const json = manager.exportAsJson();
      const uri = await vscode.window.showSaveDialog({ filters: { JSON: ['json'] }, defaultUri: vscode.Uri.file('snippets.json') });
      if (!uri) { return; }
      const encoder = new TextEncoder();
      await vscode.workspace.fs.writeFile(uri, encoder.encode(json));
      vscode.window.showInformationMessage('Snippet berhasil diekspor.');
    }),

    vscode.commands.registerCommand('rajaSnippets.importJson', async () => {
      const uri = await vscode.window.showOpenDialog({ canSelectMany: false, filters: { JSON: ['json'] } });
      if (!uri) { return; }
      const bytes = await vscode.workspace.fs.readFile(uri[0]);
      const decoder = new TextDecoder();
      const json = decoder.decode(bytes);
      try {
        await manager.importFromJson(json);
        vscode.window.showInformationMessage('Snippet berhasil diimpor.');
        treeProvider.refresh();
      } catch (e) {
        vscode.window.showErrorMessage('Impor gagal. Format JSON tidak valid.');
      }
    })
  );

  // New storage commands
  context.subscriptions.push(
    vscode.commands.registerCommand('rajaSnippets.openStorage', async () => {
      await manager.openStorage();
    }),

    vscode.commands.registerCommand('rajaSnippets.showStoragePath', async () => {
      const p = manager.getDataFilePath();
      vscode.window.showInformationMessage(`Snippets storage: ${p}`);
    }),

    vscode.commands.registerCommand('rajaSnippets.configureStorage', async () => {
      const uri = await vscode.window.showOpenDialog({ canSelectFolders: true, canSelectFiles: false, canSelectMany: false, openLabel: 'Pilih folder untuk menyimpan snippets' });
      if (!uri || uri.length === 0) { return; }
      const folder = uri[0].fsPath;
      await manager.setStoragePath(folder);
      vscode.window.showInformationMessage(`Snippets storage diset ke: ${folder}`);
      treeProvider.refresh();
    })
  );
}

export function deactivate() {}
