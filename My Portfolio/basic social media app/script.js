let feed = document.getElementById("feed");
let imagePreview = document.getElementById("imagePreview");
let selectedImage = null;

document.getElementById("postImage").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      selectedImage = e.target.result;
      imagePreview.innerHTML = `
        <img src="${selectedImage}" alt="Preview">
        <button class="remove-image" onclick="removeImage()">✖</button>
      `;
    };
    reader.readAsDataURL(file);
  }
});

function removeImage() {
  selectedImage = null;
  imagePreview.innerHTML = "";
  document.getElementById("postImage").value = "";
}

function createPost() {
  let text = document.getElementById("postText").value.trim();
  if (text === "" && !selectedImage) return;

  const timestamp = new Date().toLocaleString();

  let post = document.createElement("div");
  post.className = "post";
  post.innerHTML = `
    <p>${text}</p>
    ${selectedImage ? `<img src="${selectedImage}" alt="Post Image">` : ""}
    <span class="timestamp">Posted on ${timestamp}</span>
    <span class="like-button" onclick="toggleLike(this)">👍 Like (<span>0</span>)</span>
    <div class="comment-section">
      <input type="text" placeholder="Add a comment...">
      <button onclick="addComment(this)">Comment</button>
      <div class="comments"></div>
    </div>
  `;

  feed.prepend(post);

  // Reset inputs
  document.getElementById("postText").value = "";
  document.getElementById("postImage").value = "";
  imagePreview.innerHTML = "";
  selectedImage = null;
}

function toggleLike(button) {
  let countSpan = button.querySelector("span");
  let count = parseInt(countSpan.textContent);

  if (button.classList.contains("liked")) {
    countSpan.textContent = count - 1;
    button.classList.remove("liked");
    button.innerHTML = `👍 Like (<span>${count - 1}</span>)`;
  } else {
    countSpan.textContent = count + 1;
    button.classList.add("liked");
    button.innerHTML = `❤️ Liked (<span>${count + 1}</span>)`;
  }
}

function addComment(button) {
  let input = button.previousElementSibling;
  let commentText = input.value.trim();
  if (commentText === "") return;

  let commentDiv = document.createElement("div");
  commentDiv.className = "comment";
  commentDiv.textContent = commentText;

  button.nextElementSibling.appendChild(commentDiv);
  input.value = "";
}
