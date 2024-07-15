export interface treeResult {
  name: string
  id: number
  children: Array<treeResultItem>
}

export interface treeResultItem {
  name: string
  id: number
}
