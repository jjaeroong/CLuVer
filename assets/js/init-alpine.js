function data() {
  function getThemeFromLocalStorage() {
    // if user already changed the theme, use it
    if (window.localStorage.getItem('dark')) {
      return JSON.parse(window.localStorage.getItem('dark'))
    }

    // else return their preferences
    return (
      !!window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    )
  }

  function setThemeToLocalStorage(value) {
    window.localStorage.setItem('dark', value)
  }
  async function fetchSubclubMembers(subclubName) {
    try {
      const subclub = await Subclub.findOne({
        where: { subclubname: subclubName },
      });
  
      if (!subclub) {
        console.error('해당 소모임을 찾을 수 없습니다.');
        return [];
      }
  
      const membersList = await subclub.getUsers();
      return membersList;
    } catch (error) {
      console.error('회원 목록을 가져오는 중 오류가 발생했습니다:', error);
      return [];
    }
  }

  return {
    dark: getThemeFromLocalStorage(),
    toggleTheme() {
      this.dark = !this.dark
      setThemeToLocalStorage(this.dark)
    },
    isSideMenuOpen: false,
    toggleSideMenu() {
      this.isSideMenuOpen = !this.isSideMenuOpen
    },
    closeSideMenu() {
      this.isSideMenuOpen = false
    },
    isNotificationsMenuOpen: false,
    toggleNotificationsMenu() {
      this.isNotificationsMenuOpen = !this.isNotificationsMenuOpen
    },
    closeNotificationsMenu() {
      this.isNotificationsMenuOpen = false
    },
    isProfileMenuOpen: false,
    toggleProfileMenu() {
      this.isProfileMenuOpen = !this.isProfileMenuOpen
    },
    closeProfileMenu() {
      this.isProfileMenuOpen = false
    },
    isPagesMenuOpen: 0,
    togglePagesMenu(menuNumber) {
      this.isPagesMenuOpen = this.isPagesMenuOpen === menuNumber ? 0 : menuNumber;
    },
    // Modal
    isModalOpen: false,
    trapCleanup: null,
    openModal() {
      this.isModalOpen = true
      this.trapCleanup = focusTrap(document.querySelector('#modal'))
    },
    closeModal() {
      this.isModalOpen = false
      this.trapCleanup()
    },
    //소모임 목록 페이지 (소모임 이름) 클릭 시 소모임 참여자 목록 보임

    isPopupOpen: false,
    openPopup() {
      this.isPopupOpen = true;
    },
    closePopup() {
      this.isPopupOpen = false;
    },
    isPopupOpen: false,
    isNewPopupOpen: false,
    openNewPopup() {
      this.isPopupOpen = false;
      this.isNewPopupOpen = true;
    },
    closeNewPopup() {
      this.isNewPopupOpen = false;
    },
    closePopupAndOpenNewPopup() {
      this.isPopupOpen = false; // 기존 팝업 닫기
      this.isNewPopupOpen = true; // 새로운 팝업 열기
    },
    isSGPopupOpen: false,
    isNewSGPopupOpen: false,
    openSGPopup() {
      this.isSGPopupOpen = true;
    },
    closeSGPopup() {
      this.isSGPopupOpen = false;
    },
    openNewSGPopup() {
      this.isSGPopupOpen = false;
      this.isNewSGPopupOpen = true;
    },
    closeNewSGPopup() {
      this.isNewSGPopupOpen = false;
    },
    closeSGPopupAndOpenNewSGPopup() {
      this.isSGPopupOpen = false; // 기존 팝업 닫기
      this.isNewSGPopupOpen = true; // 새로운 팝업 열기
    },
    isColorPaletteOpen: false, // 팔레트가 열려있는지 여부를 나타내는 상태
    selectedColor: '',
    selectedColorIndex: null,
    // 팔레트를 토글하는 함수
    toggleColorPalette() {
      this.isColorPaletteOpen = !this.isColorPaletteOpen;
    },

    selectColor(color) {
      this.selectedColor = color;
      this.isColorPaletteOpen = false;
    },
    isColorSelected(color) {
      return this.selectColor === color;
    },
    isColorSelected(index) {
      return this.selectedColorIndex === index;
    },

    visableDiv1: true,
    visableDiv2: true,
    hiddenDiv1: false,
    handleButtonClick1(subclubname) {
      this.visableDiv2 = !this.visableDiv2;
      this.hiddenDiv1 = !this.hiddenDiv1;
  
      // 서버에 AJAX 요청 보내기
      fetch(`/getMembers/${subclubname}`)
          .then(response => response.json())
          .then(data => {
              // 반환된 회원 목록 데이터를 처리하는 코드 작성
              const membersList = data.membersList;
  
              // 회원 목록을 출력할 HTML 요소 선택
              const memberListElement = document.getElementById('hiddenDiv1').querySelector('.flex-grow table');
  
              // 이전에 표시된 회원 목록 지우기
              memberListElement.innerHTML = '';
  
              // 각 회원을 리스트에 추가
              membersList.forEach(member => {
                  const row = document.createElement('tr');
                  const cell = document.createElement('td');
                  cell.classList.add('flex', 'items-center', 'justify-between', 'px-2', 'py-1', 'transition-colors', 'duration-150', 'text-gray-800', 'dark:text-gray-200');
  
                  const innerDiv = document.createElement('div');
                  innerDiv.classList.add('flex', 'items-center');
  
                  const imageDiv = document.createElement('div');
                  imageDiv.classList.add('relative', 'hidden', 'w-8', 'h-8', 'mr-3', 'rounded-full', 'md:block');
  
                  const image = document.createElement('img');
                  image.classList.add('object-cover', 'w-full', 'h-full', 'rounded-full');
                  image.src = member.profileImageUrl;
                  image.alt = member.username;
                  image.loading = 'lazy';
  
                  const shadowDiv = document.createElement('div');
                  shadowDiv.classList.add('absolute', 'inset-0', 'rounded-full', 'shadow-inner');
  
                  const username = document.createElement('a');
                  username.textContent = member.username;
  
                  imageDiv.appendChild(image);
                  imageDiv.appendChild(shadowDiv);
                  innerDiv.appendChild(imageDiv);
                  innerDiv.appendChild(username);
                  cell.appendChild(innerDiv);
                  row.appendChild(cell);
                  memberListElement.appendChild(row);
              });
  
              // 회원 목록을 표시하는 HTML 요소 보이기
              memberListElement.parentElement.parentElement.style.display = 'block';
               const subclubNameSpan = document.querySelector('#hiddenDiv1 .text-blue-500');
            subclubNameSpan.textContent = `전체 소모임 > ${subclubname}`;
              console.log('반환된 회원 목록:', membersList);
          })
          .catch(error => console.error('회원 목록 조회 오류:', error));
  },
  

    visableDiv1: true,
    visableDiv2: true,
    hiddenDiv2: false,
    handleButtonClick7() {
      this.visableDiv2 = !this.visableDiv2;
      this.hiddenDiv1 = !this.hiddenDiv1;

    },
  }
}
