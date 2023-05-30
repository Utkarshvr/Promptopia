import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

/*
 Layout.jsx Use:
 Navbar should be above app children 
 Here, The Children => Page 
 So, that it stays in every page
 Just like in react router:
 Ex:
      <Navbar/>
      <Routes>
      <Route HOME />
      <Route FEED />
      </Routes>
    
*/

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
