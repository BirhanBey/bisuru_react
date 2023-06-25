import axios from 'axios';

export async function FarmStaffDataRefresh(farmer) {
  let token = localStorage.getItem('token');
  const response = await axios.get(
    `https://s3.syntradeveloper.be/bisurularavel/api/farmers/${farmer.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response);
  return response.data;
}
