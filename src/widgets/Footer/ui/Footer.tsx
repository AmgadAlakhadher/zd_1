import { useTranslation } from 'react-i18next';
import cls from './footer.module.scss';

export const Footer = () => {
  const [t] = useTranslation();
  return (
    <section className={cls.footer}>
      <div className={cls.footer__content}>
        <p className={cls.footer__content_logo}>{t('logo')}</p>
        <p className={`${cls.footer__content_copyright} capitalize`}>{t('copyright')}</p>
      </div>
    </section>
  )
}

