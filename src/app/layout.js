import "@/Styles/globals.css";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
       <div className="wrapper">
         {children}
       </div>
      </body>
    </html>
  );
}
