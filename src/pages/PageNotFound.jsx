const PageNotFound = () => {
  const nav = document.querySelector('.css-4nt3dv');
  const navHeight = nav?.getBoundingClientRect()?.height;

  return (
    <>
      <div></div>
      <div
        className="error"
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto',
          marginTop: `10rem `,
          height: `calc(100vh + ${navHeight}px)`,
          textAlign: 'center',
        }}
      >
        <div className="error__container">
          <h1 className="error__text--1">Page Not Found</h1>
          <p className="error__text--2">404</p>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
