import BaseNode from './BaseNode'
import TextUpdaterNode from './TextUpdaterNode'
import Constant from './Constant'
import Start from './Start'
import CallPrint from './CallPrint'
import If from './If'
import Compare from './Compare'
import BinOp from './BinOp'
import Assign from './Assign'
import Name from './Name'
import For from './For'
import List from './List'

const nodeTypes = {
    baseNode: BaseNode,
    textUpdater: TextUpdaterNode,
    start: Start,
    constant: Constant,
    name: Name,
    compare: Compare,
    if: If,
    list: List,
    for: For,
    callPrint: CallPrint,
    binOp: BinOp,
    assign: Assign,
};

export default nodeTypes