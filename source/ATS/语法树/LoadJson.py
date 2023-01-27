'''
加载json文件
从json文件创建语法树
'''
import ast
import json

# 读取的文件名
fileName = 'sample.json'

jsonData = {}
with open(fileName, 'r', encoding='utf-8') as f:
	jsonData = json.load(f)

#print(jsonData)


def findStart(jsonData):
	"""
	查找开始节点
	"""
	for node in jsonData['nodes']:
		if(node['type'] == 'start'):
			break
	return node


def findEdgeSource(node, jsonData):
	"""
	查找指定的节点链接关系
	"""
	edges = []
	for edge in jsonData['edges']:
		if(edge['source'] == node['id']):
			edges.append(edge)
	return edges


def findEdgeTarget(node, jsonData):
	"""
	查找指定的节点链接关系
	"""
	edges = []
	for edge in jsonData['edges']:
		if(edge['target'] == node['id']):
			edges.append(edge)
	return edges

def findEdgeSource(node, jsonData):
	"""
	查找指定的节点链接关系
	"""
	edges = []
	for edge in jsonData['edges']:
		if(edge['source'] == node['id']):
			edges.append(edge)
	return edges


def findNextNode(node, jsonData):
	"""
	查找下一个节点
	"""
	edges = findEdgeSource(node, jsonData)

	if(len(edges) == 0):
		return None

	for node in jsonData['nodes']:
		for edge in edges:
			if(node['id'] == edge['target'] and edge['sourceHandle'] == 'next' and edge['targetHandle'] == 'previous'):
				return node
	return None


def findNode(id, jsonData):
	for node in jsonData['nodes']:
		if(node['id'] == id):
			return node
	return None


def astCreateStart(node, jsonData):
	"""
	"""
	pass


def astCreateAdd(node, jsonData):
	"""
	创建add的语法树
	"""
	dictTarget = {
		'previous': None,
		'left': None,
		'right': None,
	}
	dictTarget = astCreateTargetNode(dictTarget, node, jsonData)

	astNode = ast.BinOp(dictTarget['left'], ast.Add(
	), dictTarget['right'], lineno=0, col_offset=0)
	return astNode


# 常量
def astCreateConstant(node, jsonData):
	"""
	创建常量
	"""
	value = eval(node['data']['value'])
	astNode = ast.Constant(value, lineno=0, col_offset=0)
	return astNode


# 双目运算
def astBinOp(node, jsonData):
	"""
	双目运算符
	"""
	op = node['data']['op'].lower()
	ops = {
            'add': ast.Add(),
            'sub': ast.Sub(),
            'mult': ast.Mult(),
            'div': ast.Div(),
            'floordiv': ast.FloorDiv(),
            'mod': ast.Mod(),
            'pow': ast.Pow(),
            'lshift': ast.LShift(),
            'rshift': ast.RShift(),
            'bitor': ast.BitOr(),
            'bitxor': ast.BitXor(),
            'bitand': ast.BitAnd(),
            'matmult': ast.MatMult(),
        }

	dictTarget = {
            'previous': None,
            'left': None,
            'right': None,
        }
	dictTarget = astCreateTargetNode(dictTarget, node, jsonData)

	astNode = ast.BinOp(dictTarget['left'], ops[op],
	                    dictTarget['right'], lineno=0, col_offset=0)
	return astNode


# 比较运算
def astCompare(node, jsonData):
	"""
	比较
	"""
	op = node['data']['op'].lower()
	ops = {
            'eq': ast.Eq(),
            'noteq': ast.NotEq(),
            'lt': ast.Lt(),
            'lte': ast.LtE(),
            'gt': ast.Gt(),
            'gte': ast.GtE(),
            'is': ast.Is(),
            'isnot': ast.IsNot(),
            'in': ast.In(),
            'notin': ast.NotIn(),
        }

	dictTarget = {
		'previous': None,
		'left': None,
		'comparators': None,
	}
	dictTarget = astCreateTargetNode(dictTarget, node, jsonData)

	astNode = ast.Compare(dictTarget['left'], [ops[op]], [
	                      dictTarget['comparators']], lineno=0, col_offset=0)
	return astNode


# 条件判断
def astIf(node, jsonData):
	"""
	条件判断
	"""
	dictTarget = {
		'previous': None,
		'test': None,
		#'body':None,
		#'orelse':None,
	}
	dictTarget = astCreateTargetNode(dictTarget, node, jsonData)

	dictSource = {
		#'next': None,
		'body': None,
		'orelse': None,
	}
	dictSource = astCreateSourceNode(dictSource, node, jsonData)

	astNode = ast.If(dictTarget['test'], dictSource['body'],
	                 dictSource['orelse'], lineno=0, col_offset=0)
	return astNode


def astCreateTargetNode(dictTarget, node, jsonData):
	"""
	"""
	edges = findEdgeTarget(node, jsonData)
	for edge in edges:
		if(edge['targetHandle'] in dictTarget):
			node = findNode(edge['source'], jsonData)
			astNode = astCreateNode(node, jsonData)
			dictTarget[edge['targetHandle']] = astNode
	return dictTarget


def astCreateSourceNode(dictSource, node, jsonData):
	"""
	"""
	edges = findEdgeSource(node, jsonData)
	for edge in edges:
		if(edge['sourceHandle'] in dictSource):
			node = findNode(edge['target'], jsonData)
			astNode = astCreateTree(node, jsonData)
			dictSource[edge['sourceHandle']] = astNode
	return dictSource


def astCallPrint(node, jsonData):
	"""
	调用print函数
	"""

	edges = findEdgeTarget(node, jsonData)
	for edge in edges:
		if(edge['targetHandle'] == 'value'):
			# print 函数的参数
			value = findNode(edge['source'], jsonData)
			astValue = astCreateNode(value, jsonData)
		else:
			print('参数名称%s没找到' % (edge['targetHandle']))

	name = ast.Name(id='print', ctx=ast.Load(), lineno=0, col_offset=0)
	astNode = ast.Call(name, [astValue], keywords=[], lineno=0, col_offset=0)
	return astNode


# 节点处理函数列表
astNodeMethods = {
    'start': astCreateStart,
    'constant': astCreateConstant,
    'add': astCreateAdd,
    'if': astIf,
    'compare': astCompare,
    'callPrint': astCallPrint,
	'binOp':astBinOp,
}


def astCreateNode(node, jsonData):
	"""
	创建语法树节点
	"""
	astNode = astNodeMethods[node['type']](node, jsonData)

	"""
	match node['type']:
		case 'add':
			astNode = astCreateAdd(node, jsonData)
		case 'constant':
			astNode = astCreateConstant(node)
		case 'callPrint':
			asdCallPrint = asdCallPrint(node, jsonData)
	"""
	return astNode

def astCreateTree(node, jsonData):
	"""
	创建从指定节点开始的语法树
	"""
	astNodes = []
	astNode = astCreateNode(node, jsonData)
	astNodes.append(ast.Expr(astNode, lineno=0, col_offset=0));
	nextNode = findNextNode(node, jsonData)
	while(nextNode != None):
		astNode = astCreateNode(nextNode, jsonData)
		if(isinstance(astNode, ast.If)):
			astNodes.append(astNode)
		else:
			astNodes.append(ast.Expr(astNode, lineno=0, col_offset=0))
		#print(ast.dump(astNode, indent=4))
		# 下一个节点
		nextNode = findNextNode(nextNode, jsonData)
	return astNodes

def asdCreateCall(node, jsonData):
	"""
	调用函数
	"""
	pass


def iterationNodes(jsonData):
	"""
	遍历所有节点
	"""
	astNode = None
	start = findStart(jsonData)
	astNodes = []
	nextNode = findNextNode(start, jsonData)
	while(nextNode != None):
		astNode = astCreateNode(nextNode, jsonData)
		if(isinstance(astNode, ast.If)):
			astNodes.append(astNode)
		else:
			astNodes.append(ast.Expr(astNode, lineno=0, col_offset=0))
		print(ast.dump(astNode, indent=4))
		# 下一个节点
		nextNode = findNextNode(nextNode, jsonData)
		#print(nextNode)

	astModule = ast.Module(body=astNodes, type_ignores=[])
	#astNode = ast.Expression(astNode, lineno=0, col_offset=0)
	return astModule


astNode = iterationNodes(jsonData)
print("AST", ast.dump(astNode, indent=4))
print("CODE:\n", ast.unparse(astNode))
cm = compile(astNode, '<string>', 'exec')
exec(cm)
#print(eval(cm))