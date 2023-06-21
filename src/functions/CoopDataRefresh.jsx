import axios from 'axios';

export async function CoopDataRefresh(coopId) {
  let token = localStorage.getItem('token');
  const response = await axios.get(
    `https://s3.syntradeveloper.be/bisurularavel/api/cooperatives/${coopId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}
