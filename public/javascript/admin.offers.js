function formatTime(tweetTime) {
  if(tweetTime == "null"){
    return "not updated"
  }
  else{
  let userTimeZone =
    localStorage.getItem("timezone") ||
    Intl.DateTimeFormat().resolvedOptions().timeZone;
  const tweetDate = new Date(tweetTime);

  const now = new Date();

  const localTweetTime = new Date(
    tweetDate.toLocaleString("en-US", { timeZone: userTimeZone })
  );

  const diffInSeconds = Math.floor((now - localTweetTime) / 1000);

  let timeAgo;
  if (diffInSeconds < 60) timeAgo = `${diffInSeconds} sec ago`;
  else if (diffInSeconds < 3600)
    timeAgo = `${Math.floor(diffInSeconds / 60)} min ago`;
  else if (diffInSeconds < 86400)
    timeAgo = `${Math.floor(diffInSeconds / 3600)} hours ago`;
  else if (diffInSeconds < 604800)
    timeAgo = `${Math.floor(diffInSeconds / 86400)} days ago`;
  else timeAgo = formatDateTime(localTweetTime);

  return `${timeAgo} (${formatDateTime(localTweetTime)})`;
}
}
function formatDateTime(date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(date);
}

function formatDateTime(date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(date);
}
let form = document.getElementById("offerform")
form.addEventListener('submit',async (e)=>{
    e.preventDefault()
    let formdata = new FormData(form)
    const response = await fetch("/admin/offers", {
    method: "POST",
    body: formdata,
  });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const json = await response.json();
  let results = json.message;
  alert(results)
  fetchoffers()
})

async function fetchoffers() {
   document.getElementById("tbody").innerHTML = "";
    const response = await fetch("/admin/fetchoffers", {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const json = await response.json();
  let results = json.data;
    let tablebody = document.getElementById("tbody");
  results.forEach((result) => {
    const row = `<tr>
                    <td>${result.offer_name}</td>
                    <td>${result.offer_start_date}</td>
                    <td>${result.offer_end_date}</td>
                    <td>${result.is_expired}</td>
                    <td>${formatTime(result.offer_updated_at)}</td>
                    <td>${formatTime(result.offer_created_at)}</td>
<td><a href="/admin/fetchoffer/${result.offer_id}"><span><i class="fas fa-edit"></i></span></a></td>
<td><i class="fas fa-trash" aria-hidden="true" onclick="deleteoffer(this.value)" id="myBtn" value="${result.offer_id}"></i></td></tr>`;
    tablebody.innerHTML += row;
  });
}
async function deleteoffer(id) {
    let text = "Do you want to delete offer";
  if (confirm(text) == true) {
    let formdata = new FormData(form)
    formdata.append("id",id)
    const response = await fetch("/admin/deleteoffers", {
    method: "POST",
    body: formdata,
  });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const json = await response.json();
  let results = json.message;
  alert(results)
  } else {
    alert("you prevented the delete offer!")
  }
    
fetchoffers()
}
fetchoffers()