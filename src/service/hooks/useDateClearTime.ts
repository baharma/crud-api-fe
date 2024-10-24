export default function clearTimeInDate(e: string): String {
  const date = new Date(e)
  return date.toISOString().split('T')[0]
}
