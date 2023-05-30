
document.addEventListener("DOMContentLoaded", function () {
  initMain();
  document.querySelector('#search_bar').focus();
  //
});

let logo = document.querySelector('#logo');
logo.addEventListener('click', () => {
  window.location.reload();
})




//--------------------------------------------------------------fetch 함수 option과 경로를 객체로 만듬------------------------------
let authorizations = {
  movie: {
    author: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODM5MDgwYjhmNzYzZDBmYjQ4OTVhMGJiNTkwYmE4ZSIsInN1YiI6IjY0NzA4NzNjNzcwNzAwMDBkZjEzZGQyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.m2I-4f8b-xD18PJDcO5QZPDLqt-neur_TAdlkTiyDbE',
    path: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
  },
  tv: {
    author: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODM5MDgwYjhmNzYzZDBmYjQ4OTVhMGJiNTkwYmE4ZSIsInN1YiI6IjY0NzA4NzNjNzcwNzAwMDBkZjEzZGQyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.m2I-4f8b-xD18PJDcO5QZPDLqt-neur_TAdlkTiyDbE',
    path: `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc`
  },
  star: {
    author: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODM5MDgwYjhmNzYzZDBmYjQ4OTVhMGJiNTkwYmE4ZSIsInN1YiI6IjY0NzA4NzNjNzcwNzAwMDBkZjEzZGQyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.m2I-4f8b-xD18PJDcO5QZPDLqt-neur_TAdlkTiyDbE',
    path: `https://api.themoviedb.org/3/trending/person/day?language=en-US`
  }
}

//--------------------------------------------------------------데이터를 media에 따라 동적으로 받아 옴-------------------------------------------------------------------
//기존 movie tv star 카테고리 별로  fetch 함수를 3번 사용하고 템플릿 생성까지 매번 하던 과정을  loadData 함수에 넣어서 사용

//--loadData함수의 media 인자에 넘겨줄 값들------- 
let movie = authorizations.movie;
let tv = authorizations.tv;
let star = authorizations.star;

const loadData = async (media) => {
  let results;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: media.author
    }
  };

  try {
    const response = await fetch(media.path, options);
    const data = await response.json();
    results = data.results;
    return results;
  } catch (err) {
    console.error('데이터를 불러 오지 못했습니다.');
    return null;
  }
};


const setTemp = async (media) => {
  let results = await loadData(media);
  document.querySelector('#card-box').innerHTML = '';
  results.forEach(item => {
    if (item.title) {
      let title = item.title;
      let desc = item.overview;
      let vote = item.vote_average;
      let url = item.backdrop_path;
      let id = '' + item.id;
      let temp_html =
        `     
          <div class="card" onclick='alert(${id})'>
            <div class="card-top">
              <p id=${id} >TOP MOVIE</p>
            </div>
            <div class="card-body">
              <img class="card-img" src="https://image.tmdb.org/t/p/w300${url}"
                alt="이미지를 불러오지 못했습니다.">
              <ul>
                <li class="card_title">${title}</li>
                <li class="card_desc">${desc}</li>
                <li class="card_star">${vote}</li>
              </ul>
            </div>
          </div>               
      `
      let newCard = document.createElement('div');
      newCard.classList.add('card-wrap')
      newCard.innerHTML = temp_html;
      document.querySelector('#card-box').append(newCard);
    } else if (item.poster_path) {
      let title = item.name;
      let desc = item.overview;
      let vote = item.vote_average;
      let url = item.poster_path;
      let id = '' + item.id;
      let intro = document.querySelector('#intro');
      intro.innerHTML = ` <p>Popular TV Show in the World</p>
      <p>It is viewed in the order of the most popular TV show. Search the show and check the rating</p>`

      let temp_html =
        `     
          <div  class="card" onclick='alert(${id})'>
            <div class="card-top">
              <p id=${id}>TOP TV SHOW</p>
            </div>
            <div class="card-body">
              <img class="card-img" src="https://image.tmdb.org/t/p/w300${url}"
                alt="이미지를 불러오지 못했습니다.">
              <ul>
                <li class="card_title">${title}</li>
                <li class="card_desc">${desc}</li>
                <li class="card_star"  style="text-align: center !important">${vote}</li>
              </ul>
            </div>
          </div>               
      `
      let newCard = document.createElement('div');
      newCard.classList.add('card-wrap')
      newCard.innerHTML = temp_html;
      document.querySelector('#card-box').append(newCard);




    } else {
      let name = item.name;
      let url = item.profile_path;
      let id = '' + item.id;

      let intro = document.querySelector('#intro');
      intro.innerHTML = ` <p>The world's most famous stars now</p>
    <p>You can see celebrities from all over the world at this point.</p>`

      let temp_html =
        `     
        <div  class="card" onclick='alert(${id})' style="height:334px; margin-bottom:150px;">
          <div class="card-top">
            <p id=${id}>Person</p>
          </div>
          <div class="card-body">
            <img class="card-img" src="https://image.tmdb.org/t/p/w300${url}"
              alt="이미지를 불러오지 못했습니다.">
            <ul style="height:50px">
              <li class="card_title">${name}</li>
  
            </ul>
          </div>
        </div>               
    `
      let newCard = document.createElement('div');
      newCard.classList.add('card-wrap')
      newCard.innerHTML = temp_html;
      document.querySelector('#card-box').append(newCard);
    }
  });
};




//--------------------------------------------------------------초기 화면 조회----------------------------------------------------------------------------------------
const initMain = () => {
  setTemp(movie);
}

//------------------------------------------------------------카테고리 별 버튼 구현--------------------------------------------------------------------------------------

let movieBtn = document.querySelector('#movie-btn');
movieBtn.addEventListener('click', () => {
  window.location.reload();
})

let TVBtn = document.querySelector('#tv-btn');
TVBtn.addEventListener('click', () => {
  setTemp(tv)
})

let starBtn = document.querySelector('#star-btn');
starBtn.addEventListener('click', () => {
  setTemp(star);
})



//검색기능 구현ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 



const searchInput = async () => {
  let cardBox = document.querySelector('#card-box');
  cardBox.innerHTML = '';
  let inputText = document.querySelector('#search_bar').value.toLowerCase();
  if (inputText) {
    console.log(loadData(movie))
    let movieResult = await loadData(movie)
    let tvResult = await loadData(tv)
    let starResult = await loadData(star)

    let movieArr = movieResult.filter(item => item.original_title.toLowerCase().includes(inputText));
    let tvArr = tvResult.filter(item => item.name.toLowerCase().includes(inputText));
    let starArr = starResult.filter(item => item.name.toLowerCase().includes(inputText));


    movieArr.forEach(item => {

      let title = item.original_title;
      let desc = item.overview;
      let vote = item.vote_average;
      let url1 = item.backdrop_path
      let id = '' + item.id;

      let intro = document.querySelector('#intro');
      intro.innerHTML = ` <p>Result...</p>`

      let newDiv = document.createElement('div');
      newDiv.classList.add('card-wrap');
      newDiv.innerHTML =
        `
            <div class="card" onclick='alert(${id})'>
                <div class="card-top">
                    <p id=${id}>TOP TV SHOW</p>
                </div>
                <div class="card-body">
                   <img class="card-img" src="https://image.tmdb.org/t/p/w300${url1}"
                    alt="이미지를 불러오지 못했습니다.">
                   <ul>
                     <li class="card_title">${title}</li>
                     <li class="card_desc">${desc}</li>
                     <li class="card_star"  style="text-align: center !important">${vote}</li>
                    </ul>
                </div>
            </div>                 
            
            `
      let cardBox = document.querySelector('#card-box');
      cardBox.append(newDiv);

    })

    tvArr.forEach(item => {
      let nameTv = item.name;
      let descTv = item.overview;
      let voteTv = item.vote_average;
      let url2 = item.backdrop_path;
      let id = '' + item.id;

      let intro = document.querySelector('#intro');
      intro.innerHTML = ` <p>Result...</p>`
      let newDiv = document.createElement('div');
      newDiv.classList.add('card-wrap');
      newDiv.innerHTML = `
          <div class="card" onclick='alert(${id})'>
              <div class="card-top">
                  <p id=${id}>TOP TV SHOW</p>
              </div>
              <div class="card-body">
                 <img class="card-img" src="https://image.tmdb.org/t/p/w300${url2}"
                  alt="이미지를 불러오지 못했습니다.">
                 <ul>
                   <li class="card_title">${nameTv}</li>
                   <li class="card_desc">${descTv}</li>
                   <li class="card_star"  style="text-align: center !important">${voteTv}</li>
                  </ul>
              </div>
          </div>                 
          
          `
      let cardBox = document.querySelector('#card-box');
      cardBox.append(newDiv);



    })

    starArr.forEach(item => {

      let nameStar = item.name;
      let url3 = item.profile_path;
      let id = '' + item.id
      let intro = document.querySelector('#intro');
      intro.innerHTML = ` <p>Result...</p>`

      let newDiv = document.createElement('div');
      newDiv.classList.add('card-wrap');
      newDiv.innerHTML = `
                
            <div class="card" onclick='alert(${id})' style="height:334px; margin-bottom:150px;">
              <div class="card-top">
                <p id=${id}>TOP STAR</p>
              </div>
              <div class="card-body">
                <img class="card-img" src="https://image.tmdb.org/t/p/w300${url3}"
                  alt="이미지를 불러오지 못했습니다.">
                <ul style="height:50px">
                  <li class="card_title">${nameStar}</li>
      
                </ul>
              </div>
            </div>                       
            
            `
      let cardBox = document.querySelector('#card-box');
      cardBox.append(newDiv);

    }
    )
  } else {
    alert('검색어를 입력해 주세요');
    window.location.reload();
  }



}

let search = document.querySelector('#search_btn');
search.addEventListener('click', searchInput)

let inputText = document.querySelector('#search_bar');
inputText.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    searchInput();
  }
});




