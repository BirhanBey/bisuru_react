import axios from 'axios';

export async function AnimalDataRefresh(farm) {
  let token = localStorage.getItem('token');
  console.log(farm);
  const response = await axios.get(
    `https://s3.syntradeveloper.be/bisurularavel/api/farms/${farm.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response.data);
  return response.data.animals;
}