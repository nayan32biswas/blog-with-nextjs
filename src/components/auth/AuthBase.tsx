import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Blog
      </Link>{' '}
      {'2023.'}
    </Typography>
  );
}

const theme = createTheme();

export default function AuthBase({ children, page }: any) {
  if (!page) {
    alert('Page value was not send from parent.');
    return null;
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign {page === 'SIGN_IN' ? 'In' : 'Up'}
          </Typography>
          {children}
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              {page === 'SIGN_IN' ? (
                <Link href="/auth/sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              ) : (
                <Link href="/auth/sign-in" variant="body2">
                  {'Already have an account? Sign In'}
                </Link>
              )}
            </Grid>
          </Grid>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
