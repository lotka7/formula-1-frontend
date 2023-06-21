import Driver from '@/interfaces/Driver';
import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

const get = async <T>(query: string): Promise<T> => {
  const response = await AxiosInstance.get(query);
  return response.data;
};

const post = async <T>(query: string, body: any): Promise<T> => {
  const response = await AxiosInstance.post(query, body);
  return response.data;
};

const listDrivers = async (): Promise<Driver[]> => {
  const drivers = await get<Driver[]>('/drivers');
  return drivers;
};

const overtakeDrivers = async ({
  driverId,
  drivers,
}: {
  driverId: number;
  drivers: Driver[];
}): Promise<void> => {
  await post<Driver[]>(`/drivers/${driverId}/overtake`, drivers);
};

export { listDrivers, overtakeDrivers };
