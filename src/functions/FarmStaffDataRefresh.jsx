import axios from 'axios';

export async function FarmStaffDataRefresh(farmer) {
  let token = localStorage.getItem('token');
  const response = await axios.get(
    `https://s3.syntradeveloper.be/bisurularavel/api/farmstaff/${farmer.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}
