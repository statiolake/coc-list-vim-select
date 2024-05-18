"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  activate: () => activate
});
module.exports = __toCommonJS(src_exports);
var import_coc2 = require("coc.nvim");

// src/lists.ts
var import_coc = require("coc.nvim");
var VimSelect = class extends import_coc.BasicList {
  constructor(nvim) {
    super(nvim);
    this.name = "vimselect";
    this.description = "vim.ui.select() support for CocList";
    this.defaultAction = "choose";
    this.items = [];
    this.disposables.push(
      import_coc.Disposable.create(() => nvim.call("coc_list_vim_select#on_cancel"))
    );
    this.addAction("choose", (item) => {
      const data = item.data;
      this.nvim.call("coc_list_vim_select#on_choose", [data.index]);
      this.clear();
    });
  }
  setItems(labels) {
    this.items = labels.map((label, index) => ({
      label,
      data: {
        label,
        index
      }
    }));
  }
  clear() {
    this.items = [];
  }
  async loadItems(_context) {
    return this.items;
  }
};

// src/index.ts
async function activate(context) {
  const output = import_coc2.window.createOutputChannel("list-vim-select");
  const vimSelectList = new VimSelect(import_coc2.workspace.nvim);
  context.subscriptions.push(
    import_coc2.commands.registerCommand("list-vim-select.start", async (labels) => {
      vimSelectList.setItems(labels);
      output.appendLine("labels: " + JSON.stringify(labels));
      import_coc2.workspace.nvim.command("CocList " + vimSelectList.name);
    }),
    import_coc2.listManager.registerList(vimSelectList)
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate
});
