//외부 비동기 데이터 호출 함수를 외부 파일로 따로 관리
import axios from 'axios';

export const fetchYoutube = async () => {
	const key = 'AIzaSyDOsDRuQ_v0ISUQEy6mZdnCfcf3VKIG5uE';
	const list = 'PLGrvPC1Wr19hEuOc58RgKY1uPw_0eoIbE';
	const num = 10;
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list}&key=${key}&maxResults=${num}`;

	return await axios.get(url);
};

export const fetchFlickr = async (opt) => {
	const baseURL = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
	const key = '4b95b58f2acca136d03e1c6883048c6c';
	const method_interest = 'flickr.interestingness.getList';
	const method_user = 'flickr.people.getPhotos';
	const method_search = 'flickr.photos.search';
	const num = 50;
	let url = '';

	if (opt.type === 'interest') url = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;
	if (opt.type === 'search') url = `${baseURL}&api_key=${key}&method=${method_search}&per_page=${num}&tags=${opt.tags}`;
	if (opt.type === 'user') url = `${baseURL}&api_key=${key}&method=${method_user}&per_page=${num}&user_id=${opt.user}`;

	return await axios.get(url);
};

export const fetchDepartment = async () => {
	return await axios.get(`${process.env.PUBLIC_URL}/DB/members.json`);
};

/*
  순수 함수 (Pure function)
    - 부수효과를 발생시키지 않는 순수 자바스크립트로만 동작 가능한 함수
    - 동일한 인수를 넣었을 때 동일한 값을 반환하는 함수
    - 컴포넌트 외부에서 독립적으로 동작하는 함수이므로 내부에 dom제어나 react hook 사용 불가

  부수 효과 (Side Effect)
    - 기존의 변경점을 직접적으로 야기시키는 효과
    - 컴포넌트 외부에서 사용할 수 없는 기능
*/
