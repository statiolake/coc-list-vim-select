let s:version = 0
let s:labels = []
let s:on_choose = v:null

function! coc_list_vim_select#start(version, labels, on_choose) abort
  let s:version = a:version
  let s:labels = a:labels
  let s:on_choose = a:on_choose
  call CocAction('runCommand', 'coc-list-vim-select.start', s:labels)
endfunction

function! coc_list_vim_select#on_choose(index) abort
  call call(s:on_choose, [s:version, a:index + 1])
endfunction

function! coc_list_vim_select#on_cancel() abort
  call call(s:on_choose, [v:null, v:null])
endfunction
