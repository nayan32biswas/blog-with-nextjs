import Navbar from './navbar/Navbar';

export default function Layout({ children }: any) {
  return (
    <>
      <Navbar isAuthenticated={false} />
      <main>{children}</main>
    </>
  );
}
