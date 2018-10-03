const SelectedDate = new Date();
const dayOut = document.getElementById('current-selected-day');
const potdImageOut = document.getElementById('potd-image-out');
const potdTitleOut = document.getElementById('potd-title-out');
const potdDescriptionOut = document.getElementById('potd-description-out');

document.getElementById('yesterday').addEventListener('click', () => {
  SelectedDate.setDate(SelectedDate.getDate()-1);
  render();
});

document.getElementById('tomorrow').addEventListener('click', () => {
  SelectedDate.setDate(SelectedDate.getDate()+1);
  render();
});

async function render() {
  dayOut.innerText = SelectedDate.toDateString();
  const url = new URL('https://api.nasa.gov/planetary/apod');
  url.searchParams.set('api_key', 'ugse5nrl9r5o1nycwrsXpPeyLQ9THWQIMXZ1mgU5');
  url.searchParams.set('date', SelectedDate.toISOString().slice(0,10));
  // url.searchParams.set('sort', 'activity');
  // url.searchParams.set('intitle', stackSearch);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`StackExchange API call not ok - ${status}`);
  }
  const POTD = await response.json();
  console.log(POTD);
  potdImageOut.src = POTD.url;
  potdTitleOut.innerText = POTD.title;
  potdDescriptionOut.innerText = POTD.explanation;
}
render();
