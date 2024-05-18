import {
  BasicList,
  Disposable,
  ListContext,
  ListItem,
  Neovim,
} from 'coc.nvim';

interface VimSelectListData {
  index: number;
  label: string;
}

export default class VimSelect extends BasicList {
  public readonly name = 'vimselect';
  public readonly description = 'vim.ui.select() support for CocList';
  public readonly defaultAction = 'choose';
  items: ListItem[] = [];

  constructor(nvim: Neovim) {
    super(nvim);
    this.disposables.push(
      Disposable.create(() => nvim.call('coc_list_vim_select#on_cancel'))
    );

    this.addAction('choose', (item: ListItem) => {
      const data = item.data as VimSelectListData;
      this.nvim.call('coc_list_vim_select#on_choose', [data.index]);
      this.clear();
    });
  }

  public setItems(labels: any[]) {
    this.items = labels.map((label, index) => ({
      label: label,
      data: {
        label: label,
        index: index,
      },
    }));
  }

  public clear() {
    this.items = [];
  }

  public async loadItems(_context: ListContext): Promise<ListItem[]> {
    return this.items;
  }
}
