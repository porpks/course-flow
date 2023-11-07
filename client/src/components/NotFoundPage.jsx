/* eslint-disable react/no-unescaped-entities */
function NotFoundPage() {
  return (
    <div className='gradient-bg min-h-screen flex flex-col justify-center items-center'>
      <img
        src='../../public/books.png'
        alt='Astronaut'
        className='w-32 h-32 mb-4'
      />
      <h1 className='text-4xl text-white mb-2'>404 - Page Not Found</h1>
      <p className='text-lg text-white mb-6'>
        Houston, we have a problem – it seems you're lost in space!
      </p>
      <a
        href='/'
        className='bg-white no-underline hover:bg-slate-200 text-blue-500 font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out'>
        Go Back Home
      </a>
    </div>
  );
}

export default NotFoundPage;
