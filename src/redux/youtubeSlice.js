//외부 데이터 fetching 함수 정의 및 export
//외부 데이터 함수의 결과값에 따라 전역 상태 변경 함수

import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

//비동기 서버통신으로 데이터를 전달 받아서 내부적으로 액션타입을 자동생성해서 액션 객체 생성까지 완료
const fetchYoutube = createAsyncThunk('youtube/requestYoutube', async () => {
	const key = 'AIzaSyDOsDRuQ_v0ISUQEy6mZdnCfcf3VKIG5uE';
	const list = 'PLGrvPC1Wr19hEuOc58RgKY1uPw_0eoIbE';
	const num = 10;
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list}&key=${key}&maxResults=${num}`;
	const response = await axios.get(url);

	return response.data.items;
});

const youtubeSlice = createSlice({
	name: 'youtube',
	initalState: {
		data: [],
		isLoading: false,
	},
	extraReducers: {
		[fetchYoutube.pending]: (state) => {
			state.isLoading = true;
		},
		[fetchYoutube.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
		[fetchYoutube.rejected]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
	},
});

export default youtubeSlice.reducer;
