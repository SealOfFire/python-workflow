export type NodeData = {
    id: string,
    label?: string | null,
    value?: string | null,
    op?: string | null,
    onDataChange?: (value: any | null) => void
}