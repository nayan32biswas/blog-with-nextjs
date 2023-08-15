import * as React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import General from '@/components/user/General';
import Security from '@/components/user/Security';
import Loading from '@/components/utils/Loading';
import { UserContext } from '@/context/UserContext';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

export const config = {
  matcher: ['/me']
};

function Me() {
  const [value, setValue] = React.useState(0);
  const { userState } = React.useContext(UserContext);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (!userState.me) {
    return <Loading />;
  }
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div>
          <Box sx={{ borderBottom: 1, borderColor: 'gray' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="General" {...a11yProps(0)} />
              <Tab label="Security" {...a11yProps(1)} />
            </Tabs>
          </Box>
        </div>
      </Box>
      <div>
        <TabPanel value={value} index={0}>
          <General user={userState.me} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Security />
        </TabPanel>
      </div>
    </Container>
  );
}

export default Me;
