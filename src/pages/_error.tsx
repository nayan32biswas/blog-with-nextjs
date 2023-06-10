import { NextPageContext } from 'next';

function Error({ statusCode }: { statusCode: unknown | number }) {
  let errorMessage = `An error ${statusCode} occurred on server`;
  if (statusCode) {
    // Server Side Error
  } else {
    // Client Side Error
    errorMessage = 'Please Reload the Page';
    alert(errorMessage);
  }
  return <p>{errorMessage}</p>;
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
