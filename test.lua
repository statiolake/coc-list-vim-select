local items = { "a", "b" }

local opts = {
	format_item = function(item)
		return item
	end,
}

local function on_choice(item)
	if item then
		print(item .. " is selected.")
	else
		print("cancelled")
	end
end

require("coc_list_vim_select").start(items, opts, on_choice)
