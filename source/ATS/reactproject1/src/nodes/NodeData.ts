export type NodeData = {
    id: string,
    label: string | null,
    value: string | null,
    onDataChange: (value: any | null) => void
}