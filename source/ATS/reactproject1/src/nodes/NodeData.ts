export type NodeData = {
    id: string,
    label?: string | null,
    value?: string | null,
    type: string,
    op?: string | null,
    list?: Array<any> | null,
    target?: string | null,
    targets?: string | null,
    onDataChange?: (value: any | null) => void
    onDeleteNode?: (value: any | null) => void
}