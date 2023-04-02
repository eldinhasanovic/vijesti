const container = document.querySelector(".container");
const getVideos = async () => {
  const data = await fetch(
    `https://services.brid.tv/services/get/latest/26456/0/1/25/0.json`
  );
  const users = await data.json();

  users.Video.forEach((element) => {
    const card = document.createElement("div");
    card.className = "kartica";
    const naslov = document.createElement("h3");
    naslov.innerHTML = element.name;
    const link = document.createElement("a");
    const slika = document.createElement("img");
    slika.src = element.snapshots.sd;
    link.appendChild(slika);
    link.appendChild(naslov);
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
    let duzina = document.createElement("p");
    duzina.className = "vreme";
    duzina.innerHTML = pretvori(Number(element.duration));
    card.appendChild(duzina);
  });
};

getVideos();
