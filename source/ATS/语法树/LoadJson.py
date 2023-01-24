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


def astCreateAdd(node, jsonData):
	"""
	创建add的语法树
	"""
	edges = findEdgeTarget(node, jsonData)

	if(len(edges) < 2):
		print("add 的参数不对")

	astLeft = None
	astRight = None
	for edge in edges:
		if(edge['targetHandle'] == 'left'):
			# 左节点
			left = findNode(edge['source'], jsonData)
			print('left', left)
			astLeft = astCreateNode(left, jsonData)
		elif(edge['targetHandle'] == 'right'):
			# 右节点
			right = findNode(edge['source'], jsonData)
			print('right', left)
			astRight = astCreateNode(right, jsonData)
		elif(edge['targetHandle'] == 'previous'):
			pass
		else:
			print("add 的参数不对")
	astNode = ast.BinOp(astLeft, ast.Add(), astRight, lineno=0, col_offset=0)
	return astNode


def astCreateConstant(node, jsonData):
	"""
	创建常量
	"""
	astNode = ast.Constant(node['data']['value'], lineno=0, col_offset=0)
	return astNode


def asdCallPrint(node, jsonData):
	"""
	调用print函数
	"""

	edges = findEdgeTarget(node, jsonData)
	for edge in edges:
		if(edge['targetHandle'] == 'value'):
			# print 函数的参数
			value = findNode(edge['source'], jsonData)
			astValue = astCreateNode(value, jsonData)
	
	name = ast.Name(id='print', ctx=ast.Load(), lineno=0, col_offset=0)
	astNode = ast.Call(name, [astValue], keywords=[], lineno=0, col_offset=0)
	return astNode


astNodeMethods = {
    'add': astCreateAdd,
   	'constant': astCreateConstant,
    'callPrint': asdCallPrint,
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
print("CODE", ast.unparse(astNode))
cm = compile(astNode, '<string>', 'exec')
exec(cm)
#print(eval(cm))