const container = document.querySelector(".container");
const naslov = document.querySelector("h1");
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
    link.className = "link";
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
  let links = document.getElementsByClassName("link");
  console.log(links);

  users.Video.forEach((svaki, index) => {
    links[index].addEventListener("click", function (e) {
      let broj = 0;
      // e.preventDefault();
      if (Array.from(container.children).length > 25) {
        const videoPusteni = container.lastChild;
        // console.log(videoPusteni);
        container.removeChild(videoPusteni);
      }
      let naslov = document.createElement("h2");
      naslov.textContent = svaki.name;
      naslov.style.gridRowStart = "1";
      naslov.style.justifySelf = "Center";
      naslov.style.fontFamily = "sans-serif";
      console.log(naslov);
      let novidiv = document.createElement("div");
      let video = document.createElement("video");
      video.src = svaki.source.hd;
      video.controls = "true";
      video.muted = false;
      video.loop = "true";
      video.height = "430";
      video.width = "700";
      video.autoplay = "true";
      video.style.justifySelf = "center";
      novidiv.append(video);
      novidiv.style.width = "100%";
      novidiv.style.height = "27rem";
      novidiv.style.gridRowStart = "1";
      novidiv.style.display = "grid";
      novidiv.style.justifyContent = "center";

      novidiv.style.gridColumnEnd = "1";
      novidiv.style.gridColumnStart = "6";
      container.append(novidiv);
      novidiv.append(naslov);
      window.scrollTo({
        left: 0,
        top: 0,
        behavior: "smooth",
      });
      // naslov.addEventListener("click", function () {
      //   location.reload();
      // });
    });
  });
};
getVideos();
