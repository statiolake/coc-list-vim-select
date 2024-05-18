local Item = {}

function Item.new(name)
	local obj = {
		name = name,
	}
	setmetatable(obj, { __index = Item })
	return obj
end

function Item:describe()
	return "name: " .. self.name
end

local foo = Item.new("foo")
print(foo:describe())

local items = { Item.new("a"), Item.new("b") }

local opts = {
	format_item = function(item)
		return item:describe()
	end,
}

local function on_choice(item)
	if item then
		print(item.name .. " is selected.")
	else
		print("cancelled")
	end
end

require("coc_list_vim_select").start(items, opts, on_choice)
