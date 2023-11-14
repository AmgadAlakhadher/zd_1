import React from 'react'
import { Loader } from '@/shared/ui/Loader'
import './style.scss'

export const LoaderPage: React.FC = () => {
  return (
    <div className='loaderBox'>
      <Loader />
    </div>
  )
}


