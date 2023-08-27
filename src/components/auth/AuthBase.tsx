import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

interface AuthBaseProps {
  children: React.ReactNode;
  page?: string;
}

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

export default function AuthBase({ children, page }: AuthBaseProps) {
  const router = useRouter();
  const { next } = router.query;
  function margeWithNext(url: string) {
    if (next) return `${url}?next=${next}`;
    return url;
  }
  return (
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
            <Link href="/auth/forgot-password" className="a-tag">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            {page === 'SIGN_IN' ? (
              <Link className="a-tag" href={margeWithNext('/auth/sign-up')}>
                {"Don't have an account? Sign Up"}
              </Link>
            ) : (
              <Link href={margeWithNext('/auth/sign-in')} className="a-tag">
                {'Already have an account? Sign In'}
              </Link>
            )}
          </Grid>
        </Grid>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
