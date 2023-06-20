import { GetStaticProps } from 'next';
// eslint-disable-next-line @next/next/no-document-import-in-page
import Head from 'next/head';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  // const references = await listCasestudiesData(locale);
  const drivers = ['schumacher', 'alonso']
  return {
      props: {
          drivers,
      },
  };
};

const Drivers = ({ drivers }: { drivers: string[] }): JSX.Element => {


  return (
      <>
          <Head>
              <title>Formula 1 - drivers</title>
              <meta name='description' content={'Drivers of Formula 1'} />
          </Head>
          {drivers.map((driver) => (
            <div key={driver}>{driver}</div>
          ))}
      </>
  );
};

export default Drivers;
