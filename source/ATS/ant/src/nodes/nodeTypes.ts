import BaseNode from './BaseNode'
import Start from './Start'
import BinOp from './program/BinOp'
import Compare from './program/Compare'
import Assign from './program/Assign'
import Constant from './program/Constant'
import If from './program/If'
import For from './program/For'
import List from './program/List'
import Name from './program/Name'

const nodeTypes = {
    baseNode: BaseNode,
    start: Start,
    constant: Constant,
    name: Name,
    list: List,
    assign: Assign,
    binOp: BinOp,
    compare: Compare,
    if: If,
    for: For,
};

export const nodeName: { [id: string]: string } = {
    baseNode: 'BASE NODE',
    start: 'START',
    constant: 'CONTANT',
    name: 'NAME',
    assign: 'ASSIGN',
    list: 'LIST',
    binOp: 'BIN OP',
    compare: 'COMPARATORS',
    if: 'IF',
    for: 'FOR',
};

export default nodeTypes