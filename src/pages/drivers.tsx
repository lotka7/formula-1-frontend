import { listDrivers, overtakeDrivers } from '@/data/services';
import Driver from '@/interfaces/Driver';
import { GetStaticProps } from 'next';
// eslint-disable-next-line @next/next/no-document-import-in-page
import ArrowDown from '@/icons/ArrowDown';
import ArrowUp from '@/icons/ArrowUp';
import Head from 'next/head';
import { useState } from 'react';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const drivers = await listDrivers();
  return {
    props: {
      drivers,
    },
  };
};

const Drivers = ({
  drivers: defaultDrivers,
}: {
  drivers: Driver[];
}): JSX.Element => {
  const [drivers, setDrivers] = useState<Driver[]>(defaultDrivers);

  const handleChange = async ({
    driverId,
    targetPlace,
  }: {
    driverId: number;
    targetPlace: number;
  }) => {
    const updatedDrivers = await overtakeDrivers({
      driverId,
      targetPlace,
    });
    setDrivers(updatedDrivers);
  };

  return (
    <>
      <Head>
        <title>Formula 1 - drivers</title>
        <meta name="description" content={'Drivers of Formula 1'} />
      </Head>
      {drivers.map((driver, index) => (
        <div key={driver.id} className="flex flex-row">
          <div>{`${driver.firstname} ${driver.lastname}`}</div>
          {index !== drivers.length && (
            <ArrowDown
              className="h-4 w-4 fill-red-500"
              onClick={() =>
                handleChange({
                  driverId: driver.id,
                  targetPlace: driver.place + 1,
                })
              }
            />
          )}
          {index !== 0 && (
            <ArrowUp
              className="h-4 w-4 fill-green-500"
              onClick={() =>
                handleChange({
                  driverId: driver.id,
                  targetPlace: driver.place - 1,
                })
              }
            />
          )}
        </div>
      ))}
    </>
  );
};

export default Drivers;
