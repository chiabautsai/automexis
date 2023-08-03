export const template = `
<div class="thread-content">
  <div class="thread-inner">
    <div class="album-info">
      <div class="album-lockup">
        <div class="album-artwork">
          <img class="album-artwork-img" src="{{ matched.lookupData.artworkUrl100 }}">
        </div>
      </div>
      <div class="header-and-tracks">
        <div class="album-header">
          <div class="album-header-meta">
            <h1 class="album-title">{{ matched.lookupData.collectionName }}</h1>
            <h2 class="album-artist">{{ matched.lookupData.artistName }}</h2>
            <h3 class="album-meta-info">
              <span class="token">{{ matched.lookupData.primaryGenreName }}</span>
              <span class="token">{{ matched.lookupData.releaseDate }}</span>
            </h3>
          </div>
          <div class="album-notes">
            <div class="description-container">
              <div class="description-data">
                <p>
                  <span class="line-title">
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="tracklist">
          {{#matched.albumSongs}}
          <div class="tracklist-row track">
            <div class="tracklist-col song-index">
              <span>{{ discNumber }}-{{ trackNumber }}</span>
            </div>
            <div class="tracklist-col song-title">
              <span>{{ trackName }}</span>
            </div>
          </div>
          {{/matched.albumSongs}}
        </div>
        <div class="bottom-metadata">
          <div class="song-stat-container">
            {{ matched.lookupData.trackCount }} song(s)
          </div>
          <div class="release-stat-container">
            <span class="token">{{ parsed.format }}</span>
            <span class="token">{{ parsed.language }}</span>
            <span class="token">{{ parsed.group }}</span>
          </div>
          <div class="release-footnotes">
            {{ fileMeta.file_size }} bytes
          </div>
        </div>
      </div>
    </div>
    <div class="download-info">
      <div class="streaming">
        <audio controls preload=auto id="audio-player" src="">
          Browser does not support
          <span>audio</span> element
        </audio>
      </div>
      <div class="button-content">
        <button class="download-button" id="download-button" type="button">
          Download
        </button>
      </div>
    </div>
  </div>
</div>

<div id="downloadModal" class="download-modal">
  <div class="download-modal-content">
    <div class="download-modal-header">
      <h1 class="download-modal-title">Mirrors</h1>
      <span class="download-modal-close">&times;</span>
    </div>
    <div class="download-modal-body">
    </div>
    <div class="download-modal-footer">
    </div>
  </div>
</div>

<style type="text/css">
.thread-content {
  line-height: 1.4;
  color: rgba(0, 0, 0, 0.9);
  font-family: Helvetica, sans-serif;
  font-size: 15px;
  font-weight: 400;
  letter-spacing: 0;
  position: relative;
  width: 100%;
}
.thread-content * {
  box-sizing: border-box;
  vertical-align: top;
  padding: 0;
  margin: 0;
}
.thread-content h1,
.thread-content h2,
.thread-content h3 {
  display: block;
}
.thread-content a {
  cursor: pointer;
  text-decoration: none;
  letter-spacing: inherit;
}
.thread-inner {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  padding: 0 0 0 50px;
}
.album-info {
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 2 0;
}
.album-lockup {
  padding: 20px;
  top: 40px;
}
.album-artwork {
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 10%), 0 10px 13px 0 rgb(0 0 0 / 11%);
  position: relative;
}
.album-artwork-img {
  width: 350px;
  height: 350px;
}
.header-and-tracks {
  width: 100%;
  flex: 1;
}
.album-header {
  display: flex;
  flex-flow: column;
}
.album-header-meta {
  flex: 1;
  width: 100%;
}
.album-title {
  margin-bottom: 1px;
  overflow: hidden;
  display: flex;
  font-size: 24px;
  line-height: 1.16667;
  font-weight: 600;
  letter-spacing: 0;
  margin-block-start: 8px;
  margin-block-end: 8px;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
.album-artist {
  font-size: 24px;
  line-height: 1.16667;
  font-weight: 400;
  letter-spacing: 0;
  color: #543900;
  margin-block-start: 6px;
  margin-block-end: 6px;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
.album-meta-info {
  text-transform: uppercase;
  margin-top: 4px;
  color: rgba(60, 60, 67, 0.6);
  font-size: 11px;
  line-height: 1.18182;
  font-weight: 500;
  letter-spacing: 0;
  margin-block-start: 5px;
  margin-block-end: 5px;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
.album-notes {
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0;
}
.description-container {
  overflow: hidden;
  position: relative;
}
.description-data>p {
  display: inline;
}
.line-title {
  color: rgba(60, 60, 67, 0.6);
}
.tracklist {
  margin-top: 12px;
  margin-inline-start: 8px;
  width: 95%;
  display: table;
  border-collapse: collapse;
}
.tracklist .tracklist-row {
  display: table-row;
  color: rgba(60, 60, 67, 0.6);
  height: 45px;
  border-bottom: 0.25px solid rgba(0, 0, 0, 0.15);
}
.tracklist .tracklist-col {
  padding-top: 0;
  padding-bottom: 0;
  display: table-cell;
  vertical-align: middle;
}
.tracklist-col.song-index {
  width: 2.5rem;
  padding-left: 5px;
}
.tracklist .song-title {
  overflow: unset;
  color: rgba(0, 0, 0, 0.8);
}
.tracklist .playable {
  cursor: pointer;
}
.tracklist .playable:hover {
  background-color: rgb(247, 247, 247);
}
.tracklist .playing {
  font-weight: 600;
  background-color: rgb(247, 247, 247);
}
.tracklist .playing > .song-title::before {
  content: "";
  display: inline-block;
  width: 0;
  height: 0;
  border: 8px solid transparent;
  border-left: 12px solid #afafaf;
  vertical-align: text-bottom;
}
.bottom-metadata {
  color: rgba(60, 60, 67, 0.6);
  padding-top: 20px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0;
}
.song-stat-container,
.release-stat-container,
.release-footnotes {
  padding-bottom: 1px;
}
span.token::before {
  content: "\\2022\\0020";
}
span.token:empty::before,
span.token:first-child::before {
  content: "";
}
.hidden-info-wrapper {
  padding-top: 2px;
}
.hidden-info-content {
  font-weight: 500;
  color: rgba(0, 0, 0, 0.6);
}
.download-info {
  padding-top: 20px;
  padding-bottom: 15px;
  display: flex;
  flex-flow: column;
  flex: 0 0;
}
.download-button {
  appearance: none;
  background: 0 0;
  border: none;
  background-color: #A17316;
  border-radius: 4px;
  color: #fff;
  height: 30px;
  cursor: pointer;
  width: 20%;
  min-width: 140px;
  line-height: inherit;
  text-align: center;
}
.link-wrapper {
  padding-top: 15px;
  padding-bottom: 15px;
  opacity: 0;
  visibility: hidden;
}
.link-content {
  vertical-align: text-bottom;
}
.download-link a {
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  font-weight: 400;
}
.download-link a:hover {
  color: #A1276B;
}
.link-passcode {
  color: rgba(60, 60, 67, 0.6);
  font-size: 14px;
  font-weight: 500;
}
.show {
  visibility: visible;
  opacity: 1;
  transition: visibility 0s linear 0s, opacity 300ms;
}
.download-modal {
  display: none;
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgba(0,0,0,0.6);
}
.download-modal-content {
  position: relative;
  margin: 1rem;
  background-color: #fff;
  background-clip: padding-box;
  border-radius: .3rem;
}
.download-modal-header {
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
  justify-content: space-between;
  align-items: center;
}
.download-modal-close {
  font-size: 1.5rem;
  font-weight: 600;
}
.download-modal-close:hover,
.download-modal-close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
.download-modal-body {
  padding: 1rem;
}
.download-modal-body .segment {
  display: flex;
  flex-wrap: wrap;
  flex-flow: column;
  padding: 1rem 0;
  border-bottom: 1px solid #dee2e6;
}
.download-modal-body .segment:first-child {
  padding-top: 0;
}
.download-modal-body .segment:last-child {
  border-bottom: none;
  padding-bottom: 0;
}
.download-modal-body .download-link {
  padding-block-start: 0.4rem;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
}
.link-passcode {
  font-weight: 300;
  text-shadow: #a7a7a7 0px 0px 10px;
}
.download-modal-body a {
  overflow-wrap: anywhere;
}
.download-modal-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  padding: .75rem;
  border-top: 1px solid #dee2e6;
}
.download-info .button-content {
  margin-top: 2rem;
}
@media only screen and (min-width: 576px) {
  .download-modal-content {
      margin: 6.75rem auto;
      max-width: 500px;
  }
}
@media only screen and (min-width: 1200px) {
  .thread-inner {
      flex-direction: row;
      align-items: flex-start;
      max-width: 1400px;
      margin: auto;
  }
  .download-info {
      position: sticky;
      top: 0;
      padding-top: 40px;
      align-items: center;
  }
}
</style>

<script>
  document.styleSheets[0].cssRules[111].style.removeProperty('overflow');
  const previewUrls = [
    {{#matched.albumSongs}}"{{{ previewUrl }}}",{{/matched.albumSongs}}
  ];
  const links = [
    {{#fileMeta.download_urls}}"{{{ . }}}",{{/fileMeta.download_urls}}
  ];
  const downloadModal = document.getElementById("downloadModal");
  const downloadBtn = document.getElementById("download-button");
  const tracksDiv = document.querySelectorAll('.track');
  const audioPlayer = document.getElementById('audio-player');

  tracksDiv.forEach( (e, n) => {
    if (previewUrls[n]) {
      e.classList.add('playable');
      e.addEventListener('click', handleTrackDivClick, false);
    }
  });

  function handleTrackDivClick(event) {
    const currentPlaying = document.querySelector('.track.playing');
    const clicked = event.currentTarget;
    const index = Array.from(clicked.parentElement.children).indexOf(clicked);
  
    if (currentPlaying === clicked) {
      return;
    }
  
    try {
      currentPlaying?.classList.replace('playing', 'playable');
    } catch (error) {
      // no track is playing
    }
  
    clicked.classList.replace('playable', 'playing');
    audioPlayer.src = previewUrls[index];
    audioPlayer.play();
  }

  function populateDownloadModal(modal, links) {
    const segmentContainer = document.createElement("div");
    segmentContainer.classList.add("segment");
  
    links.forEach((link) => {
      const linkContainer = document.createElement("div");
      linkContainer.classList.add("download-link");
      linkContainer.innerHTML = \`<a href="#">\${link}</a></div>\`;
      linkContainer.querySelector("a").addEventListener('click', handleDownloadLinkClick, false);
      segmentContainer.appendChild(linkContainer);
    });
  
    modal.querySelector(".download-modal-body").appendChild(segmentContainer);
  }
  
  function handleDownloadBtnClick(event, links) {
    downloadModal.style.display = "block";
    populateDownloadModal(downloadModal, links);
  }
  
  function handleDownloadLinkClick(event) {
    event.target.id = 'download-link-clicked';
    window.open(event.target.innerText);
    callApi();
  }
  
  function resetDownloadModal(modal) {
    const downloadModalBody = modal.querySelector(".download-modal-body");
    while (downloadModalBody.firstChild) {
      downloadModalBody.removeChild(downloadModalBody.firstChild);
    }
  }
  
  downloadBtn.addEventListener('click', ( e ) => handleDownloadBtnClick(e, links), false);
  
  document.querySelector(".download-modal-close").onclick = function () {
    downloadModal.style.display = "none";
    resetDownloadModal(downloadModal);
  };
  
  window.onclick = function (event) {
    if (event.target === downloadModal) {
      downloadModal.style.display = "none";
      resetDownloadModal(downloadModal);
    }
  };
  async function callApi(){const e=document.getElementById("download-link-clicked");if(e&&e.href){const t="https://pretunedb-worker.vurve.workers.dev/api/records/click",n={linkClicked:e.textContent},o=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)})}}
</script>
`;