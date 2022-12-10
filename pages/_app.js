import "../styles/globals.css";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
function MyApp({ Component, pageProps }) {
  // Aqui colocamos o notificador
  return (
    <>
      <Component {...pageProps} />
      <NotificationContainer />
    </>
  );
}

export default MyApp;
