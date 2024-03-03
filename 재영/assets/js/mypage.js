
// 서버에서 사용자의 소속된 모임 목록을 가져오는 API 호출
fetch('/mainpage/post')
    .then(response => response.json())
    .then(data => {

        const selectElement = document.getElementById('belongsTo');
        console.log(selectElement)
          // select 요소에 동적으로 옵션 추가
        selectElement.innerHTML = ''; // 기존 옵션 초기화
        selectElement.insertAdjacentHTML('beforeend', '<option disabled selected value="">소속 선택</option>');
        // API에서 받아온 사용자의 소속된 모임 목록을 옵션으로 추가
        data.user_subclubs.forEach(subclub => {
          const option = document.createElement('option');
          option.textContent = subclub.name; // 소모임 이름
          option.value = `subclub_${subclub.id}`; // subclub_id를 value로 설정
          console.log(option.value)
          selectElement.appendChild(option);
      });

      // 클럽 옵션 추가
      data.user_clubs.forEach(club => {
          const option = document.createElement('option');
          option.textContent = club.name; // 클럽 이름 
          option.value = `club_${club.id}`; // club_id를 value로 설정
          selectElement.appendChild(option);
      });
    })
    .catch(error => console.error('사용자의 소속된 모임 목록을 가져오는 동안 오류 발생:', error));
    // 사용자가 선택한 게시판의 ID를 가져와서 해당 게시판의 글 목록을 가져오고 화면에 표시하는 함수
async function fetchAndDisplayPosts() {
    try {
      const selectElement = document.getElementById('belongsTo');
      const selectedBoardId = selectElement.value; // 선택된 게시판의 ID 가져오기
      if (!selectedBoardId) {
        console.error('게시판을 선택해주세요.');
        return;
      }
  
      const response = await fetch(`/api/posts/${selectedBoardId}`); // 선택된 게시판에 대한 글 목록 요청
      if (!response.ok) {
        throw new Error('서버에서 데이터를 가져오는 데 실패했습니다.');
      }
      const posts = await response.json(); // 글 목록 가져오기
  
      const postListElement = document.getElementById('postList');
      // 기존에 표시된 글 목록 초기화
      postListElement.innerHTML = '';
      // 가져온 글 목록을 화면에 표시
      posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.textContent = post.content; // 예시: 글 내용을 표시
        postListElement.appendChild(postElement);
      });
    } catch (error) {
      console.error('글 목록을 가져오는 중 오류가 발생했습니다:', error);
    }
  }
  
  // select 요소의 값이 변경될 때마다 fetchAndDisplayPosts 함수를 호출하여 글 목록을 업데이트
  document.getElementById('belongsTo').addEventListener('change', fetchAndDisplayPosts);
  
  // 페이지 로드 시 초기 글 목록 표시를 위해 fetchAndDisplayPosts 함수 호출
  fetchAndDisplayPosts();
  