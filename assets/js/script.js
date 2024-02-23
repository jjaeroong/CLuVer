const isLeapYear = (year) => {
    return (
        (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
        (year % 100 === 0 && year % 400 === 0)
    );
};
const getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
};
let calendar = document.querySelector('.calendar');
const month_names = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
let month_picker = document.querySelector('#month-picker');

document.addEventListener("DOMContentLoaded", function () {
    let month_picker = document.querySelector('#month-picker');
    month_picker.onclick = () => {
        month_list.classList.remove('hideonce');
        month_list.classList.remove('hide');
        month_list.classList.add('show');
    };

    document.querySelector('#pre-year').onclick = () => {
        --currentYear.value;
        generateCalendar(currentMonth.value, currentYear.value);
    };
    document.querySelector('#next-year').onclick = () => {
        ++currentYear.value;
        generateCalendar(currentMonth.value, currentYear.value);
    };
})

const generateCalendar = (month, year) => {
    let calendar_days = document.querySelector('.calendar-days');
    calendar_days.innerHTML = '';
    let calendar_header_year = document.querySelector('#year');
    let days_of_month = [
        31,
        getFebDays(year),
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
    ];

    let currentDate = new Date();

    month_picker.innerHTML = month_names[month];

    calendar_header_year.innerHTML = year;

    let first_day = new Date(year, month, 1); // 변경된 부분
    let startingDay = first_day.getDay(); // 변경된 부분

    for (let i = 0; i < days_of_month[month] + startingDay; i++) {
        let day = document.createElement('div');
        if (i >= startingDay) {
            day.innerHTML = i - startingDay + 1;
            if (i - startingDay + 1 === currentDate.getDate() &&
                year === currentDate.getFullYear() &&
                month === currentDate.getMonth()) {
                day.classList.add('current-date');
            }
        }
        else {
            day.classList.add('empty-day'); // 빈 날짜를 나타내는 클래스 추가
        }
        calendar_days.appendChild(day);
    }
};

let month_list = calendar.querySelector('.month-list');
month_names.forEach((e, index) => {
    let month = document.createElement('div');
    month.innerHTML = `<div>${e}</div>`;

    month_list.append(month);
    month.onclick = () => {
        currentMonth.value = index;
        generateCalendar(currentMonth.value, currentYear.value);
        month_list.classList.replace('show', 'hide');
    };
});

(function () {
    month_list.classList.add('hideonce');
})();

let currentDate = new Date();
let currentMonth = { value: currentDate.getMonth() };
let currentYear = { value: currentDate.getFullYear() };
generateCalendar(currentMonth.value, currentYear.value);


document.addEventListener("DOMContentLoaded", function () {
    // 기존 코드와 함께 캘린더 생성

    const calendarHeader = document.querySelector('.calendar-header');
    const calendarBody = document.querySelector('.calendar-body');
    const backButton = document.querySelector('#back-button');
    const addEventButton = document.querySelector('#add-event-button');

    calendarBody.addEventListener('click', function (event) {
        const target = event.target;
        // 클릭한 요소가 숫자를 포함하는 날짜인지 확인
        if (target.classList.contains('calendar-days') || isNaN(parseInt(target.innerText))) return;

        calendarHeader.style.display = 'none';
        calendarBody.style.display = 'none';

        backButton.style.display = 'block';
        
        const eventDate = new Date(currentYear.value, currentMonth.value, parseInt(target.innerText));

        const clickedDateInfo = document.createElement('div');
        const monthIndex = currentMonth.value + 1; // 월의 숫자를 가져와서 1을 더해줌
        clickedDateInfo.textContent = `${currentYear.value}.${monthIndex}.${target.innerText}`;
        clickedDateInfo.classList.add('clicked-date-info', 'dark:text-gray-200');
        document.querySelector('.calendar-footer').appendChild(clickedDateInfo);

        const newDiv = document.createElement('div');
        newDiv.innerHTML = `
           
        `;
        newDiv.classList.add('newDiv', 'my-2', 'px-2'); // 필요한 스타일 클래스 추가

        document.querySelector('.calendar-footer').appendChild(newDiv);

        addEventButton.style.display = 'block';

    });

    backButton.addEventListener('click', function () {

        // 캘린더 header 및 body 다시 표시
        calendarHeader.style.display = 'flex';
        calendarBody.style.display = 'block';
        // 뒤로 가기 및 일정 추가 버튼 숨기기
        backButton.style.display = 'none';
        addEventButton.style.display = 'none';

        const clickedDateInfo = document.querySelector('.clicked-date-info');
        const newDiv = document.querySelector('.newDiv');
        if (clickedDateInfo) clickedDateInfo.remove();
        if (newDiv) newDiv.remove();
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const addEventButton = document.querySelector('#add-event-button');
    const calendarFooter = document.querySelector('.calendar-footer');
    let currentPopup = null; // 현재 열려 있는 팝업을 추적하기 위한 변수

    // 일정 추가 버튼 클릭 시 팝업 표시
    addEventButton.addEventListener('click', async function () {
     
  
        
        // 이전에 열려 있던 팝업이 있다면 닫기
        if (currentPopup) {
            currentPopup.parentNode.removeChild(currentPopup);
        }
        
        const clickedDateInfo = document.querySelector('.clicked-date-info');
        const clickedDate = clickedDateInfo.textContent.trim();
        const [clickedYear, clickedMonth, clickedDay] = clickedDate.split('.'); // 클릭한 날짜에서 연도, 월, 일 추출
      

        const popupHTML = `

        <div class="fixed inset-0 z-30 bg-black bg-opacity-50 flex items-center justify-center">
            <div class="bg-white w-196 p-6 rounded-lg relative">
                <button class="absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-gray-800" id="close-popup">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
      
                    <div class="mb-2 flex flex-col text-center">
                        <span class="font-medium px-24 mt-2 mb-1">일정 추가</span>
                        <div id="clicked-date-info" class="mb-2 text-xs text-gray-500">
                            ${clickedYear}.${clickedMonth}.${clickedDay}
                        </div>
                
                        <div class="mb--2 flex justify-end relative">
                            <select id="clubselect" name="clubselect" class="block w-thrity text-xxs dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray">
                                <option disabled selected value="">게시판 선택</option>
                                <option>SWUWEB</option>
                                <option>View</option>
                                <option>Model</option>
                                <option>Controller</option>
                            </select>
                        </div>
                     
                            <span class="text-xxs ml-1 text-left">일정명</span>
                            <input id="event-name" name="schname" class="block mt-2 mb-2 text-xxs text-black form-input" style="min-width: 350px;" />
                            <span class="text-xxs ml-1 text-left">일정 장소</span>
                            <input id="event-location" name="schcontent" class="block mt-2 mb-2 text-xxs text-black form-input" style="min-width: 350px;" />
                            <span class="text-xxs ml-1 text-left">일정 시각</span>
                            <input id="event-time" name="eventtime" class="block mt-2 mb-2 text-xxs text-black form-input" style="min-width: 350px;" />
                            <div class="mt-4 mb-4 flex items-center justify-center">
                        
                                <button id="add-event" type="submit" class="px-4 py-2 text-xs font-semibold leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                                    추가
                                </button>
                        
                            </div>
                        
             
                </div>
            </div>
        </div>

    `
        // 팝업을 DOM에 추가
        document.body.insertAdjacentHTML('beforeend', popupHTML);

        // select 요소에 동적으로 옵션 추가
        const selectElement = document.getElementById('clubselect');
        const response = await fetch('mainpage/view'); // 적절한 엔드포인트로 변경해주세요
        const data = await response.json();

        console.log(selectElement)

        // select 요소에 동적으로 옵션 추가
        selectElement.innerHTML = ''; // 기존 옵션 초기화
        selectElement.insertAdjacentHTML('beforeend', '<option disabled selected value="">게시판 선택</option>');

    // 소모임 옵션 추가
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
        
      


        // 현재 팝업 설정
        currentPopup = document.body.lastElementChild;

        // 팝업 닫기 버튼 이벤트 처리
        const closeButton = currentPopup.querySelector('#close-popup');
        closeButton.addEventListener('click', function () {
            currentPopup.parentNode.removeChild(currentPopup);
            currentPopup = null; // 현재 팝업을 닫았으므로 null로 설정
        });

        // 추가 버튼 이벤트 처리
        const addEvent = currentPopup.querySelector('#add-event');
        addEvent.addEventListener('click', async function () {
            
            const selectedIndex = selectElement.selectedIndex;
            const selectedOption = selectElement.options[selectedIndex];
            const selectedValue = selectedOption.value;
          
            const eventDate = new Date(clickedYear, clickedMonth-1, clickedDay);

            const eventDateUTC = new Date(eventDate.getTime() + eventDate.getTimezoneOffset() * 60000);
            eventDateUTC.setDate(eventDateUTC.getDate() + 1); 
           
            const eventName = document.querySelector('#event-name').value;
            const eventLocation = document.querySelector('#event-location').value;
            const eventtime = document.querySelector('#event-time').value;
        
            let subclub_id, club_id;
        
            if (selectedValue.startsWith('subclub_')) {
                subclub_id = selectedValue.substring(8);
            }
            if (selectedValue.startsWith('club_')) {
                club_id = selectedValue.substring(5);
            }
        
            // 서버로 일정 정보 전송
            const response = await fetch('mainpage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    schname: eventName,
                    schcontent: eventLocation,
                    eventtime: eventtime,
                    sub_id: subclub_id,
                    club_id: club_id,
                    eventDate:  eventDateUTC.toISOString() // 날짜 객체를 ISO 형식의 문자열로 변환하여 서버로 전달합니다.
                })
            });
      
        
         

            
           
                // 추가할 일정 요소 생성
                const eventElement = document.createElement('div');
                eventElement.classList.add('block', 'p-3', 'dark:bg-gray-700', 'dark:text-gray-200', 'flex');
                eventElement.innerHTML = `
                    <div class="circle inline-block ml-2 mr-2 mt-2"></div>
                    <div class="block"> 
                        <span class="inline-block text-sm font-medium ml-1">${eventName}</span>
                        <p class="text-xs text-gray-500 mt-1 ml-1">${eventLocation}</p>
                        <p class="text-xs text-gray-500 mt-1 ml-1">${eventtime}</p>
                    
                    </div>
                `;

            // 클릭한 날짜에 일정 추가
            const newDiv = document.querySelector('.newDiv');
            newDiv.appendChild(eventElement);
            
    
          

            // 팝업 닫기
            currentPopup.parentNode.removeChild(currentPopup);
            currentPopup = null;
        });
        document.body.appendChild(currentPopup);
    });
 
});
