export const formatDate = (jsonDate: string) => {
  const date = new Date(jsonDate)

  let day: number | string = date.getDate()
  let month: number | string = date.getMonth() + 1
  const year = date.getFullYear()

  if (day < 10) {
    day = '0' + day
  }

  if (month < 10) {
    month = '0' + month
  }

  return `${day}.${month}.${year}`
}
