import Link from "next/link";

import { Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import ProfileMenu from "./ProfileMenu";
// import SearchModal from "./SearchModal";
import SearchModalV2 from "./SearchModalV2";

export default function Navbar() {
  const isAuthenticated = true;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" }, p: 2 }}
          >
            <Link href="/">Blog</Link>
          </Typography>
          {/* <Link href="/">Blog</Link> */}

          <SearchModalV2 />
          <Box sx={{ flexGrow: 1 }} />
          {isAuthenticated === true ? <ProfileMenu /> : <Link href="/auth/sign-in">Sign In</Link>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
