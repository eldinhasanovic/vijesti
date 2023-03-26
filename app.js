const getVideos = async () => {
  const data = await fetch(
    `https://services.brid.tv/services/get/latest/26456/0/1/25/0.json`
  );
  const users = await data.json();
  console.log(users);
  console.log(users.Video[1]);
};
getVideos();
