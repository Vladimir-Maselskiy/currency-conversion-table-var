import { Layout } from 'antd';
import './App.css';
import { Box } from './components/Box/Box';
import { RateTable } from './components/RateTable/RateTable';
import {
  contentStyle,
  footerStyle,
  headerStyle,
} from './App.styled';
// import logo from './logo.svg';
const { Header, Footer, Content } = Layout;

function App() {
  // const [symbol, setSymbol] = useState({});

  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Header style={headerStyle}>Header</Header>
      <Content style={contentStyle}>
        <RateTable />
      </Content>
      <Footer style={footerStyle}>Footer</Footer>
    </Box>
  );
}

export default App;
