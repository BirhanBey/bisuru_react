import axios from 'axios';

export async function FarmStaffDataRefresh(farm) {
  let token = localStorage.getItem('token');
  const response = await axios.get(
    `https://s3.syntradeveloper.be/bisurularavel/api/farmstaff/${farm.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}
