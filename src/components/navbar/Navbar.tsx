import Link from "next/link";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import ProfileMenu from "./ProfileMenu";
import SearchModal from "./SearchModal";

export default function Navbar() {
  const isAuthenticated = true;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link href="/">Blog</Link>

          <SearchModal />
          <Box sx={{ flexGrow: 1 }} />
          {isAuthenticated === true ? <ProfileMenu /> : <Link href="/auth/sign-in">Sign In</Link>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
