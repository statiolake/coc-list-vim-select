local M = {}

local curr_version = 0
local curr_items = {}
local curr_on_choice = nil

function M.start(items, opts, on_choice)
	curr_version = curr_version + 1
	curr_items = items
	curr_on_choice = on_choice

	local labels = {}
	for _, item in ipairs(items) do
		local label = item
		if opts.format_item then
			label = opts.format_item(item)
		end
		table.insert(labels, label)
	end
	vim.fn["coc_list_vim_select#start"](curr_version, labels, M.on_choose)
end

function M.on_choose(version, index)
	if not version or not index then
		return
	end

	if curr_version ~= version then
		return
	end

	local item = curr_items[index]
	if item and curr_on_choice then
		curr_on_choice(item)
	end
end

return M
