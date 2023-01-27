import BaseNode from './BaseNode'
import TextUpdaterNode from './TextUpdaterNode'
import Constant from './Constant'
import Start from './Start'
import CallPrint from './CallPrint'
import If from './If'
import Compare from './Compare'
import BinOp from './BinOp'

const nodeTypes = {
    baseNode: BaseNode,
    textUpdater: TextUpdaterNode,
    start: Start,
    constant: Constant,
    compare: Compare,
    if: If,
    callPrint: CallPrint,
    binOp: BinOp,
};

export default nodeTypes