const addBookMarkButton = document.getElementById("input-button");
const bookMarkName = document.getElementById("bookmark-name");
const bookMarkURL = document.getElementById("link-input");
const bookMarksContainer = document.querySelector(".bookmarks-container");


function getBookMarkFromStorage() {
  const data = localStorage.getItem("bookmarks");
  return data ? JSON.parse(data) : [];
}

function saveBookMark(bookName, bookURL) {
  const data = getBookMarkFromStorage();
  data.push({ bookName, bookURL });
  localStorage.setItem("bookmarks", JSON.stringify(data));
}

function removeBookMark(bookName, bookURL) {
  let data = getBookMarkFromStorage();
  data = data.filter(
    (element) => !(element.bookName === bookName && element.bookURL === bookURL)
  );
  localStorage.setItem("bookmarks", JSON.stringify(data));
  loadBookMarkUI();
}

function loadBookMarkUI() {
  bookMarksContainer.innerHTML = "";
  const data = getBookMarkFromStorage();
  data.forEach((element) => updateBookMark(element.bookName, element.bookURL));
}

const updateBookMark = (bookName, bookURL) => {
  const li = document.createElement("li");
  const a = document.createElement("a");
  const removeButton = document.createElement("button");

  a.href = bookURL;
  a.target = "_blank";
  a.textContent = bookName;

  removeButton.textContent = "ReMove";
  removeButton.id = "remove-button";
  removeButton.addEventListener("click", () => {
    removeBookMark(bookName, bookURL);
  });

  li.classList.add("bookmark");
  li.appendChild(a);
  li.appendChild(removeButton);

  bookMarksContainer.appendChild(li);
};

addBookMarkButton.addEventListener("click", (e) => {
  const bookMark = bookMarkName.value.trim();
  const urlBookMark = bookMarkURL.value.trim();
  const date = new Date();

  if (!bookMark || !urlBookMark) {
    alert("Please Enter Both The Values ⚠️");
    return;
  } else if (
    !urlBookMark.startsWith("http://") &&
    !urlBookMark.startsWith("https://")
  ) {
    alert(
      "Your URL Has To Start With https:// Or https:// Please Check It Once Again ⚠️"
    );
    return;
  } else {
    // alert("SaVed SuCCeSSFuLLy ✅ At : " + date.toDateString());
    updateBookMark(bookMark, urlBookMark);
    saveBookMark(bookMark, urlBookMark);

    bookMarkName.value = "";
    bookMarkURL.value = "";
  }
});

loadBookMarkUI();
