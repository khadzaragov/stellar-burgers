import React, { FC } from 'react';
import clsx from 'clsx';
import styles from './profile-menu.module.css';
import { NavLink } from 'react-router-dom';
import { ProfileMenuUIProps } from './type';

export const ProfileMenuUI: FC<ProfileMenuUIProps> = ({
  pathname,
  handleLogout
}) => (
  <>
    <NavLink
      to={'/profile'}
      className={({ isActive }) =>
        clsx(
          'text',
          'text_type_main-medium',
          'text_color_inactive',
          'pt-4',
          'pb-4',
          styles.link,
          { [styles.link_active]: isActive }
        )
      }
      end
    >
      Профиль
    </NavLink>
    <NavLink
      to={'/profile/orders'}
      className={({ isActive }) =>
        clsx(
          'text',
          'text_type_main-medium',
          'text_color_inactive',
          'pt-4',
          'pb-4',
          styles.link,
          { [styles.link_active]: isActive }
        )
      }
    >
      История заказов
    </NavLink>
    <button
      className={clsx(
        'text',
        'text_type_main-medium',
        'text_color_inactive',
        'pt-4',
        'pb-4',
        styles.button
      )}
      onClick={handleLogout}
    >
      Выход
    </button>
    <p className='pt-20 text text_type_main-default text_color_inactive'>
      {pathname === '/profile'
        ? 'В этом разделе вы можете изменить свои персональные данные'
        : 'В этом разделе вы можете просмотреть свою историю заказов'}
    </p>
  </>
);
