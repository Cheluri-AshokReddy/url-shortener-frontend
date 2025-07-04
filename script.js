function shortenURL() {
  const url = document.getElementById('urlInput').value.trim();

  if (!url) {
    alert('Please enter a URL.');
    return;
  }

  fetch('https://url-shortener-lxlb.onrender.com/shorten', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: encodeURI(url) }),
  })
    .then(res => res.json())
    .then(data => {
      if (data.shortUrl) {
        const short = data.shortUrl;
        document.getElementById('result-container').style.display = 'block';
        document.getElementById('shortenedLink').href = short;
        document.getElementById('shortenedLink').textContent = short;
        updateHistory(short);
      } else {
        alert(data.error || 'Something went wrong!');
      }
    })
    .catch(err => {
      console.error(err);
      alert('Something went wrong!');
    });
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
