import * as React from 'react'
import { DashboardOutlined, FormOutlined, FileSearchOutlined } from '@ant-design/icons'
import { history, dispatch } from './store'
import Notes from './routes/notes'
import Runtime from './routes/runtime'
import Files from './routes/files'

export interface MenuItem {
  key: string
  name: string
  icon?: any
  href?: string
  children?: MenuItem[],
  component?: React.ComponentType
}
export const TITLE = 'F2E App'
export const ROUTE_INDEX = '/notes'

export const menus : MenuItem[] = [
  {
    key: '/notes',
    name: '代办事项',
    icon: <FormOutlined />,
    href: '/notes',
    component: Notes,
  },
  {
    key: '/files',
    name: '文档展示',
    icon: <FileSearchOutlined />,
    href: '/files',
    component: Files,
  },
  {
    key: '/runtime',
    name: '运行状态',
    icon: <DashboardOutlined />,
    href: '/runtime',
    component: Runtime,
  },
];

export const getDefaultOpenKeys = () => {
  const { pathname } = location
  return menus.filter(m => m.children && m.children.find(c => c.href === pathname)).map(m => m.key);
}

const title = document.title;
const dispatch_pathname = (location: Location) => {
  const pathname = location.pathname || '/'
  let item = menus.find(m => m.href === pathname)
  if (item) {
    document.title = title + '-' + item.name
  }
  dispatch(state => ({ ...state, pathname: location.pathname }))
}
history.listen(function () {
  dispatch_pathname(window.location)
})
dispatch_pathname(window.location)
