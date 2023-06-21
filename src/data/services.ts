import Driver from '@/interfaces/Driver';
import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

const get = async <T>(query: string): Promise<T> => {
  const response = await AxiosInstance.get(query);
  return response.data;
};

const post = async <T>(query: string): Promise<T> => {
  const response = await AxiosInstance.post(query);
  return response.data;
};

const listDrivers = async (): Promise<Driver[]> => {
  const drivers = await get<Driver[]>('/drivers');
  return drivers;
};

const overtakeDrivers = async ({
  driverId,
  targetPlace,
}: {
  driverId: number;
  targetPlace: number;
}): Promise<Driver[]> => {
  console.log('here', process.env.NEXT_PUBLIC_SERVER_URL);
  const searchParams = new URLSearchParams(`targetPlace=${targetPlace}`);

  const drivers = await post<Driver[]>(
    `/drivers/${driverId}/overtake?${searchParams.toString()}`,
  );
  return drivers;
};

export { listDrivers, overtakeDrivers };
