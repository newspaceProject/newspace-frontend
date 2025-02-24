import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_NEWSPACE_TEST_BACKEND_URL}`.replace(/\/$/, '');

// 특정 키워드에 해당하는 뉴스 목록을 가져오는 함수
export const fetchNewsByCategory = async (keyword) => {
    try {
        const url = `${BASE_URL}/api/news?keyword=${encodeURIComponent(keyword)}`;
        console.log("API 요청 URL:", url); 

        const response = await axios.get(url);
        return response.data; // 뉴스 목록 반환
    } catch (error) {
        console.error("뉴스 데이터 불러오기 실패:", error);
        throw error;
    }
};

