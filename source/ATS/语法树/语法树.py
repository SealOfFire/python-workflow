# https://docs.python.org/zh-cn/3/library/ast.html
# https://stackoverflow.com/questions/52819981/how-do-you-compile-an-ast-expr
import ast
from asyncio import constants
from copyreg import constructor

func_def = \
'''
def add(x,y):
	return x+y;
print(add(3,5 ))
'''

func_2=\
"""
a=2+3
b=3+4
"""


r_node = ast.parse(func_2)
print("1", ast.dump(r_node, indent=4))

node = ast.UnaryOp()
node.op = ast.USub()
node.operand = ast.Constant()
node.operand.value = 5
node.operand.lineno = 0
node.operand.col_offset = 0
node.lineno = 0
node.col_offset = 0

# 定义常量
node1=ast.Constant('10')
print(ast.dump(node1, indent=4))

node2=ast.parse('123' , mode='eval')

# 赋值
node3=ast.Name("aa", ast.Load)

print(ast.dump(node2, indent=4))
print(ast.dump(node, indent=4))

def constant(value):
	node = ast.Constant(value, lineno=0, col_offset=0)
	node.id='bb'
	# 前后延迟
	return node

def add(left, right):
	node = ast.BinOp(left, ast.Add(), right, lineno=0, col_offset=0)
	node.id="aa";
	# 前后延迟
	return node

node111 = add(constant("11"),constant("22"))
node222=ast.Expression(node111, lineno=0, col_offset=0)

nodeLeft = ast.Constant(10, lineno=0, col_offset=0)
nodeRight= ast.Constant(2, lineno=0, col_offset=0)
node4=ast.BinOp(nodeLeft, ast.Add(), nodeRight, lineno=0, col_offset=0) 
node5=ast.Call('print',[node4])
node6=ast.Expression(node4, lineno=0, col_offset=0)
#node5=ast.Expr(node4)
#node7=ast.Expression(node5);
#node5.body.lineno=1
print(ast.dump(node6, indent=4))


node7=ast.parse('10+2', mode='eval') 
print(ast.dump(node7, indent=4))


print(ast.unparse(node6))
print(ast.unparse(node7))

# 编译运行语法树
cm=compile(node222, '<string>', 'eval')
print(eval(cm))
print(1+2)