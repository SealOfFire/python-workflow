# https://docs.python.org/zh-cn/3/library/ast.html
# https://stackoverflow.com/questions/52819981/how-do-you-compile-an-ast-expr
import ast


func_def = \
'''
def add(x,y):
	return x+y;
print(add(3,5 ))
'''

func_2 ="print(\"11\")"
func_3 ="print(\"11\"+\"22\")"

func_4= \
"""
if(1==1):
	print(1)
else:
	print(1)
"""

func_5="ddd=1+2"

func_6= \
"""
a1 = 5
a = [1, a1, 2, 3]
"""

r_node = ast.parse(func_6)
print("1.1", ast.dump(r_node, indent=4))
print("1.2", ast.unparse(r_node))
cm = compile(r_node, '<string>', 'exec')
exec(cm)

node1 = ast.Constant("11", lineno=0, col_offset=0)
node2 = ast.Call(ast.Name(id='print', ctx=ast.Load(), lineno=0, col_offset=0), [node1], keywords=[], lineno=0, col_offset=0)
node3 = ast.Expr(node2, lineno=0, col_offset=0)
node4 = ast.Module(body=[node3], type_ignores=[])
print("2.1", ast.dump(node4, indent=4))
print("2.2", ast.unparse(node4))
cm = compile(node4, '<string>', 'exec')
exec(cm)
