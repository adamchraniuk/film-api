export interface Movie {
  id: number
  genres: string[]
  title: string
  year: string
  runtime: string
  director: string
  actors?: string
  plot?: string
  posterUrl?: string
}

export interface Error {
  value: string
  msg: string
  param: string
  location: string
}
