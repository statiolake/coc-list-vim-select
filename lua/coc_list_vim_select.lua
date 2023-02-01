local M = {}

function M.start(items, opts, on_choice)
	vim.fn["coc_list_vim_select#start"](items, opts, on_choice)
end

return M
