import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className='h-screen bg-gray-200'>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp
