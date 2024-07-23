document.addEventListener("DOMContentLoaded", function() {
  const checkButton = document.getElementById("checkButton");
  const resultElement = document.getElementById("result");

  checkButton.addEventListener("click", function() {
    const channelId = document.getElementById("channelId").value;

    if (channelId) {
      getChannelInfo(channelId);
    } else {
      resultElement.textContent = "Please enter a valid channel ID.";
    }
  });

  function getChannelInfo(channelId) {
    const apiKey = "YOUR_YOUTUBE_API_KEY";
    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=1`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.items.length > 0) {
          const lastUploadDate = new Date(data.items[0].snippet.publishedAt);
          const formattedDate = formatDateTime(lastUploadDate);

          resultElement.textContent = `Last upload was on ${formattedDate}.`;
        } else {
          resultElement.textContent = "No uploads found for the channel.";
        }
      })
      .catch(error => {
        console.error(error);
        resultElement.textContent = "Error fetching channel info.";
      });
  }

  function formatDateTime(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZoneName: 'short' };
    return date.toLocaleDateString('hu-HU', options);
  }
});
