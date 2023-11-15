import { memo } from 'react'
import { AppRouter } from './providers/router'
import './app.scss'

export const App = memo(() => {
  return (
    <AppRouter />
  )
})