import axios from 'axios';

export async function AnimalDataRefresh(farm) {
  // console.log('elma');
  let token = localStorage.getItem('token');
  const response = await axios.get(
    `https://s3.syntradeveloper.be/bisurularavel/api/farms/${farm.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    );
    console.log(response.data);
  return response.data;
}