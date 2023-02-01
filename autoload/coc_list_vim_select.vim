let s:items = []
let s:opts = {}
let s:on_choice = {}

function! coc_list_vim_select#start(items, opts, on_choice) abort
  let s:items = a:items
  let s:opts = a:opts
  let s:on_choice = a:on_choice
  if has_key(a:opts, 'format_item')
    let labels = map(copy(a:items), {_, v -> call(a:opts.format_item, [v])})
  else
    let labels = copy(a:items)
  endif
  call CocAction('runCommand', 'coc-list-vim-select.start', labels)
endfunction

function! coc_list_vim_select#on_choose(index) abort
  echomsg "chosen " .. s:items[a:index]
  call call(s:on_choice, [s:items[a:index], a:index + 1])
endfunction

function! coc_list_vim_select#on_cancel() abort
  call call(s:on_choice, [v:null, v:null])
endfunction
