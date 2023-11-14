import { memo } from 'react'
import './app.scss'
import { AppRouter } from './providers/router'
export const App = memo(() => {
  return (
    <AppRouter />
  )
})