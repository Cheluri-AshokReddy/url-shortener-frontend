function shortenURL() {
  const url = document.getElementById('urlInput').value.trim();
  if (!url) {
    alert('Please enter a URL.');
    return;
  }

  fetch('https://url-shortener-lxlb.onrender.com/shorten', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: encodeURI(url) })
  })
    .then(res => {
      if (!res.ok) {
        return res.text().then(msg => {
          console.error('Server error:', msg);
          return null;                       
        });
      }
      return res.json();
    })
    .then(data => {
      if (data && data.shortUrl) {
        const shortcode = data.shortUrl.split('/').pop();
        const short = `https://url-shortener-lxlb.onrender.com/${shortcode}`;

        document.getElementById('result-container').style.display = 'block';
        const linkEl = document.getElementById('shortenedLink');
        linkEl.href = short;
        linkEl.textContent = short;

        updateHistory(short);
      }
    })
    .catch(err => console.error('Network error:', err));   // no alert shown
}

function copyToClipboard() {
  const text = document.getElementById('shortenedLink').textContent;
  navigator.clipboard.writeText(text).then(() => {
    alert('Copied to clipboard!');
  });
}

function updateHistory(newLink) {
  const list = document.getElementById('history');
  const li = document.createElement('li');
  li.innerHTML = `<a href="${newLink}" target="_blank">${newLink}</a>`;
  list.prepend(li);
  if (list.children.length > 2) list.removeChild(list.lastChild);
}
