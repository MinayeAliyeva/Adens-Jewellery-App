import React from 'react';
import { Layout, Typography, Button, Input, Switch, Divider } from 'antd';

const { Header, Content } = Layout;
const { Title } = Typography;

const SettingsPage = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ backgroundColor: '#001529', color: '#fff', display: 'flex', alignItems: 'center' }}>
                <img src="/static/logo.png" alt="Logo" style={{ height: 40, marginRight: 16 }} />
                <Title level={3} style={{ color: '#fff', margin: 0 }}>Ayarlar</Title>
            </Header>
            <Content style={{ padding: '24px', backgroundColor: '#f5f5f5' }}>
                <Divider orientation="left">Genel Ayarlar</Divider>
                <Input placeholder="Site Adı" style={{ marginBottom: 16 }} />
                <Input.TextArea placeholder="Açıklama" rows={4} style={{ marginBottom: 16 }} />

                <Divider orientation="left">Bildirim Ayarları</Divider>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <span style={{ marginRight: 8 }}>E-posta Bildirimleri</span>
                    <Switch defaultChecked />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <span style={{ marginRight: 8 }}>SMS Bildirimleri</span>
                    <Switch />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button type="primary">Kaydet</Button>
                </div>
            </Content>
        </Layout>
    );
};

export default SettingsPage;
