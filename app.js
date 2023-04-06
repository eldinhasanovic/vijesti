const container = document.querySelector(".container");
const naslov = document.querySelector("h1");
const getVideos = async () => {
  const data = await fetch(
    `https://services.brid.tv/services/get/latest/26456/0/1/25/0.json`
  );
  const users = await data.json();
  console.log(users);

  users.Video.forEach((el) => {
    card = document.createElement("div");
    card.className = "kartica";
    title = document.createElement("h3");
    title.innerHTML = el.name;
    link = document.createElement("a");
    link.className = "link";
    img = document.createElement("img");
    img.src = el.snapshots.sd;
    link.appendChild(title);
    link.appendChild(img);
    card.appendChild(link);
    container.appendChild(card);
    function pretvori(time) {
      let h = Math.trunc(time / 3600);
      let m = Math.trunc((time % 3600) / 60);
      let s = time - (h * 3600 + m * 60);
      if (m > 9 && s > 9) return `0${h}:${m}:${s}`;
      else if (m > 9 && s <= 9) return `0${h}:${m}:0${s}`;
      else if (m <= 9 && s > 9) return `0${h}:0${m}:${s}`;
      else return `0${h}:0${m}:0${s}`;
    }
    let duration = document.createElement("p");
    duration.className = "duration";
    duration.textContent = pretvori(Number(el.duration));
    card.appendChild(duration);
  });
};
getVideos();
