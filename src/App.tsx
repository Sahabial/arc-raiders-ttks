import { Layout, Typography } from 'antd';
import WeaponsTable from './components/WeaponsTable';

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          padding: '0 24px',
        }}
      >
        <Title
          level={1}
          style={{
            color: 'white',
            margin: 0,
            textAlign: 'center',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
            fontWeight: 700,
            letterSpacing: '2px',
            fontSize: '2.5rem',
          }}
        >
          Arc Raiders weapons TTKs
        </Title>
      </Header>
      <Content style={{ padding: '24px' }}>
        <WeaponsTable />
      </Content>
    </Layout>
  );
}

export default App;
