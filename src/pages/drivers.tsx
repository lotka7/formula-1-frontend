import { listDrivers, overtakeDrivers } from '@/data/services';
import Driver from '@/interfaces/Driver';
import { GetStaticProps } from 'next';
// eslint-disable-next-line @next/next/no-document-import-in-page
import Direction from '@/enums/Direction';
import ArrowDown from '@/icons/ArrowDown';
import ArrowUp from '@/icons/ArrowUp';
import { Reorder } from 'framer-motion';
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

  const handleChanges = async (
    driverId: number,
    index: number,
    direction: Direction,
  ) => {
    const copiedDrivers = [...drivers];

    let otherDriverIndex = index - 1;

    if (direction === Direction.UP) {
      copiedDrivers[index].place -= 1;
      copiedDrivers[otherDriverIndex].place += 1;
    } else {
      otherDriverIndex = index + 1;
      copiedDrivers[index].place += 1;
      copiedDrivers[otherDriverIndex].place -= 1;
    }

    const sortedDrivers = copiedDrivers.sort((a, b) => a.place - b.place);
    setDrivers(sortedDrivers);
    await overtakeDrivers({ driverId, drivers: sortedDrivers });
  };

  const handleOnDragEnd = async ({
    driverId,
    drivers,
  }: {
    driverId: number;
    drivers: Driver[];
  }) => {
    console.log('drivers', drivers);
    const updatedDrivers = drivers.map((driver, index) => {
      driver.place = index + 1;
      return driver;
    });
    setDrivers(updatedDrivers);
    await overtakeDrivers({ driverId, drivers });
  };

  return (
    <>
      <Head>
        <title>Formula 1 - drivers</title>
        <meta name="description" content={'Drivers of Formula 1'} />
      </Head>
      <Reorder.Group
        axis="y"
        values={drivers}
        onReorder={setDrivers}
        className="my-4"
      >
        {drivers.map((driver, index) => (
          <div
            key={driver.id}
            className={`flex flex-row justify-center items-center 
            ${index % 2 ? 'ml-[100px]' : 'mr-[100px]'}`}
          >
            {index !== drivers.length - 1 && (
              <ArrowDown
                className="h-4 w-4 fill-red-500"
                onClick={() => handleChanges(driver.id, index, Direction.DOWN)}
              />
            )}
            <Reorder.Item
              value={driver}
              className={`hover:cursor-grab active:cursor-grabbing flex flex-row justify-center items-center m-4 space-x-3 border-solid border-2 border-indigo-600 rounded p-3`}
              onDragEnd={() =>
                handleOnDragEnd({ driverId: driver.id, drivers })
              }
            >
              <img src={driver.imgSrc} alt={driver.code} />
              <div className="text-center">{`#${driver.place}`}</div>
              <div>{`${driver.firstname} ${driver.lastname}`}</div>
            </Reorder.Item>
            {index !== 0 && (
              <ArrowUp
                className="h-4 w-4 fill-green-500"
                onClick={() => handleChanges(driver.id, index, Direction.UP)}
              />
            )}
          </div>
        ))}
      </Reorder.Group>
    </>
  );
};

export default Drivers;
