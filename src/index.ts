import {
  commands,
  ExtensionContext,
  listManager,
  window,
  workspace,
} from 'coc.nvim';
import VimSelect from './lists';

export async function activate(context: ExtensionContext): Promise<void> {
  const output = window.createOutputChannel('list-vim-select');
  const vimSelectList = new VimSelect(workspace.nvim);
  context.subscriptions.push(
    commands.registerCommand('list-vim-select.start', async (labels) => {
      vimSelectList.setItems(labels);
      output.appendLine('labels: ' + JSON.stringify(labels));
      workspace.nvim.command('CocList ' + vimSelectList.name);
    }),
    listManager.registerList(vimSelectList)
  );
}
