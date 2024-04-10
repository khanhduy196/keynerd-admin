import { UilCreateDashboard } from '@iconscout/react-unicons';
import { Menu } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import UilEllipsisV from '@iconscout/react-unicons/icons/uil-ellipsis-v';
import propTypes from 'prop-types';
import routePaths from '../routes/routePaths';

function MenuItems({ toggleCollapsed }) {
  const { t } = useTranslation();

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const { topMenu } = useSelector((state) => {
    return {
      topMenu: state.ChangeLayoutMode.topMenu,
    };
  });

  // const dispatch = useDispatch();

  const path = '/admin';

  const pathName = window.location.pathname;
  const pathArray = pathName.split(path);
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath.split('/');

  const [openKeys, setOpenKeys] = React.useState(
    !topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : [],
  );

  const onOpenChange = (keys) => {
    setOpenKeys(keys[keys.length - 1] !== 'recharts' ? [keys.length && keys[keys.length - 1]] : keys);
  };

  const onClick = (item) => {
    if (item.keyPath.length === 1) setOpenKeys([]);
  };

  // const changeLayout = (mode) => {
  //   dispatch(changeLayoutMode(mode));
  // };
  // const changeNavbar = (topMode) => {
  //   const html = document.querySelector('html');
  //   if (topMode) {
  //     html.classList.add('hexadash-topmenu');
  //   } else {
  //     html.classList.remove('hexadash-topmenu');
  //   }
  //   dispatch(changeMenuMode(topMode));
  // };
  // const changeLayoutDirection = (rtlMode) => {
  //   if (rtlMode) {
  //     const html = document.querySelector('html');
  //     html.setAttribute('dir', 'rtl');
  //   } else {
  //     const html = document.querySelector('html');
  //     html.setAttribute('dir', 'ltr');
  //   }
  //   dispatch(changeDirectionMode(rtlMode));
  // };

  // const darkmodeActivated = () => {
  //   document.body.classList.add('dark');
  // };

  // const darkmodeDiactivated = () => {
  //   document.body.classList.remove('dark');
  // };

  const items = [
    getItem(
      <NavLink onClick={toggleCollapsed} to={`${routePaths.order.list}`}>
        {t('orders')}
      </NavLink>,
      'orders',
      !topMenu && <UilCreateDashboard />,
      null,
    ),
    getItem(
      <NavLink onClick={toggleCollapsed} to={`${routePaths.keycap.list}`}>
        {t('keycaps')}
      </NavLink>,
      'keycaps',
      !topMenu && <UilCreateDashboard />,
      null,
    ),
  ];

  return (
    <Menu
      onOpenChange={onOpenChange}
      onClick={onClick}
      mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
      // // eslint-disable-next-line no-nested-ternary
      defaultSelectedKeys={
        !topMenu
          ? [
              `${
                mainPathSplit.length === 1 ? 'home' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]
              }`,
            ]
          : []
      }
      defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : []}
      overflowedIndicator={<UilEllipsisV />}
      openKeys={openKeys}
      items={items}
    />
  );
}

MenuItems.propTypes = {
  toggleCollapsed: propTypes.func,
};

export default MenuItems;
