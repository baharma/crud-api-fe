export const findItemById = (items: any[], id: number) =>
  items.find((item) => item.id.toString() === id.toString())
