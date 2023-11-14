import React from 'react'
import cls from './errorPage.module.scss';
export const ErrorPage: React.FC = () => {
  return (
    <>
      {/* <Header btnGoBack={true} />  */}
      <div className={cls.main}>
        <div className={cls.fof}>
              <h1>Error 404</h1>
              <p className={`${cls.errorPage__desc} capitalize`}>произошла непредвиденная ошибка</p>
        </div>
      </div>
    </>
  )
}


