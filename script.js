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
        const shortcode = data.shortUrl.split('/').pop();  // just get code part
        const short = `https://url-shortener-lxlb.onrender.com/${shortcode}`;
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
