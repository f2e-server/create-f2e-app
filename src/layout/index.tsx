import * as React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router';
import { Layout as Layer, Menu, Dropdown, Spin, Result, Button, Switch as SwitchRadio } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { connect, getState, dispatch, history } from '../store';
import Logo from './logo';
import { menus, getDefaultOpenKeys } from '../menu';
import { ThemeType } from '../../serve/interfaces';
import ServerTime from './ServerTime'

const { SubMenu } = Menu

interface Props {
    loading: number;
    collapsed: boolean;
    pathname: string;
    toggleCollapse: () => void
    theme: ThemeType
}
class Layout extends React.Component<Props> {
    clickMenu = ({ key }): void => {
        history.push(key);
    }

    clickOverlay = ({ key }) => {
        switch (key) {
            case 'admin':
                window.location.href = '/admin';
                break;
            case 'logout':
                window.location.href = '/logout';
                break;
            default:
                break;
        }
    }

    overlay = () => {
        return (
            <Menu onClick={this.clickOverlay}>
                <Menu.Item key="admin">进入管理页</Menu.Item>
                <Menu.Item key="logout">登出</Menu.Item>
            </Menu>
        );
    }

    render() {
        const { collapsed, toggleCollapse, loading, pathname, theme } = this.props
        return (
            <Spin spinning={loading > 0}>
                <Layer

                >
                    <Layer.Sider
                        trigger={null}
                        collapsible
                        collapsed={collapsed}
                        style={{
                            overflow: 'auto',
                            height: '100vh',
                            position: 'fixed',
                            left: 0,
                        }}
                    >
                        <a href=""><Logo collapsed={collapsed} /></a>
                        <Menu
                            theme="dark"
                            mode="inline"
                            onClick={this.clickMenu}
                            selectedKeys={[pathname]}
                            defaultOpenKeys={getDefaultOpenKeys()}
                        >
                            {
                                menus.map(m => m.children ? (
                                    <SubMenu
                                        key={m.key}
                                        title={<div>{m.icon}<span>{m.name}</span></div>}
                                    >
                                        {m.children.map(sub => <Menu.Item key={sub.key}>
                                            {sub.icon}<span>{sub.name}</span>
                                        </Menu.Item>)}
                                    </SubMenu>

                                ) : (
                                        <Menu.Item key={m.key}>
                                            {m.icon} <span>{m.name}</span>
                                        </Menu.Item>
                                    ))
                            }
                        </Menu>
                    </Layer.Sider>
                    <Layer style={{ marginLeft: collapsed ? 80 : 200 }}>
                        <Layer.Header
                            style={{
                                backgroundColor: theme === 'dark' ? '#1f1f1f' : '#fff',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            {collapsed ? <MenuUnfoldOutlined className="trigger" onClick={toggleCollapse} /> : <MenuFoldOutlined className="trigger" onClick={toggleCollapse} />}
                            <span>
                                <ServerTime />
                                &nbsp;
                                <SwitchRadio checked={theme === 'dark'} onChange={isDark => dispatch(state => ({
                                    ...state,
                                    theme: isDark ? 'dark' : 'default',
                                }))}/>
                                <Dropdown
                                    overlay={this.overlay()}
                                >
                                    <span style={{ cursor: 'pointer', marginLeft: '50px' }}>
                                        用户用户
                                    </span>
                                </Dropdown>
                            </span>

                        </Layer.Header>
                        <Layer.Content
                            style={{
                                margin: 16,
                                padding: 16,
                                background: theme === 'dark' ? '#333' : '#fff',
                                minHeight: 300,
                                overflowY: 'auto',
                            }}
                        >
                            <Router history={history}>
                                <Switch>
                                    <Route path="/" exact component={() => <Redirect to={menus[0].href} />} />
                                    {menus.map(menu => menu.component && <Route key={menu.key} path={menu.href} exact component={menu.component} />)}
                                    <Route component={() => <Result status="404" title="404"
                                        subTitle={`页面未找到或者无权限`}
                                        extra={<Button type="link" href="">返回首页</Button>}
                                    />} />
                                </Switch>
                            </Router>
                        </Layer.Content>
                    </Layer>
                </Layer>
            </Spin>

        );
    }
}

const toggleCollapse = () => dispatch(state => ({ ...state, collapsed: !state.collapsed }))
export default connect(() => {
    const { loading, collapsed, pathname, theme } = getState()
    return {
        loading,
        collapsed,
        pathname,
        toggleCollapse,
        theme,
    }
})(Layout);
