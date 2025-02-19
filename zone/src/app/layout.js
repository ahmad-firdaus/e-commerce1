import Config from "./core/config";
import "./globals.css";



export const metadata = {
  title: {
    default: Config.appName(), // default title/website name
    template: "%s | " + Config.appName(), // default template for title
  },       // This will be the title of the website
  description: "Tempat yang nyaman untuk menemukan furniture impianmu.", // default description of the website
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Rubik+Doodle+Shadow&family=Sofia+Sans:ital,wght@0,1..1000;1,1..1000&display=swap" rel="stylesheet" />
      </head>
      <body>{children}
      </body>

    </html>
  );
}
