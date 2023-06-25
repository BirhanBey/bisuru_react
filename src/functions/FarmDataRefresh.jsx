import axios from 'axios';

export async function FarmDataRefresh(farmer) {
  let token = localStorage.getItem('token');
  // console.log(farmer);
  const response = await axios.get(
    `https://s3.syntradeveloper.be/bisurularavel/api/farmers/${farmer.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}
