import '@/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      router.push('/auth');
    } else {
      router.push('/dashboard');
    }
  }, []);
  return <Component {...pageProps} />
}
