function data() {
  function getThemeFromLocalStorage() {
    if (window.localStorage.getItem('dark')) {
      return JSON.parse(window.localStorage.getItem('dark'))
    }

    return (
      !!window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    )
  }

  function setThemeToLocalStorage(value) {
    window.localStorage.setItem('dark', value)
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
    isNewPopupOpen: false,
    openPopup() {
      this.isPopupOpen = true;
    },
    closePopup() {
      this.isPopupOpen = false;
    },
    openNewPopup() {
      this.isPopupOpen = false;
      this.isNewPopupOpen = true;
    },
    closeNewPopup() {
      this.isNewPopupOpen = false;
    },
    closePopupAndOpenNewPopup() {
      this.isPopupOpen = false;
      this.isNewPopupOpen = true;
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
      this.isSGPopupOpen = false;
      this.isNewSGPopupOpen = true;
    },
    isColorPaletteOpen: false,
    selectedColor: '',
    selectedColorIndex: null,
    toggleColorPalette() {
      this.isColorPaletteOpen = !this.isColorPaletteOpen;
    },

    selectColor(color) {
      this.selectedColor = color;
      this.isColorPaletteOpen = false;
    },
    isColorSelected(color) {
      return this.selectedColor === color;
    },
    isColorSelectedByIndex(index) {
      return this.selectedColorIndex === index;
    },

    visableDiv1: true,
    visableDiv2: true,
    hiddenDiv1: false,
    handleButtonClick1() {
      this.visableDiv2 = !this.visableDiv2;
      this.hiddenDiv1 = !this.hiddenDiv1;

    },

    hiddenDiv2: false,
    handleButtonClick2() {
      this.visableDiv2 = !this.visableDiv2;
      this.hiddenDiv2 = !this.hiddenDiv2;

    },

    hiddenDiv3: false,
    handleButtonClick3() {
      this.visableDiv2 = !this.visableDiv2;
      this.hiddenDiv3 = !this.hiddenDiv3;

    },

    hiddenDiv4: false,
    handleButtonClick4() {
      this.visableDiv2 = !this.visableDiv2;
      this.hiddenDiv4 = !this.hiddenDiv4;

    },

    hiddenDiv5: false,
    handleButtonClick5() {
      this.visableDiv2 = !this.visableDiv2;
      this.hiddenDiv5 = !this.hiddenDiv5;

    },

    visableDiv3: true,
    hiddenDiv6: false,
    GetIDClick1() {
      this.visableDiv3 = !this.visableDiv3;
      this.hiddenDiv6 = !this.hiddenDiv6;

    },

    visibleDiv: true,
    hiddenDiv7: false,
    hiddenDiv8: false,
    toggleDivs() {
      this.visibleDiv = !this.visibleDiv;
      this.hiddenDiv7 = !this.hiddenDiv7;
      this.hiddenDiv8 = !this.hiddenDiv8;

    },
  }
}
