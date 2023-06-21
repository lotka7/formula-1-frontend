// import Navbar from './navbar'
// import Footer from './footer'

export default function Layout({ children }) {
  return (
    <>
      {/* <Navbar /> */}
      <main className="flex items-center bg-slate-600">{children}</main>
      {/* <Footer /> */}
    </>
  );
}
