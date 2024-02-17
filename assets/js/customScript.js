// public/js/fetchMembers.js

async function fetchMembers(subclubName) {
    try {
        const response = await fetch(`/api/subclubs/${subclubName}/members`);
        const data = await response.json();
        const memberTable = document.getElementById('memberTable');
        memberTable.innerHTML = ''; // 이전에 표시된 내용 지우기
        data.members.forEach(member => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="flex items-center justify-center px-2 py-1">
                    <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img class="object-cover w-full h-full rounded-full"
                            src="${member.profileImageUrl}"
                            alt="${member.username}" loading="lazy" />
                        <div class="absolute inset-0 rounded-full shadow-inner"
                            aria-hidden="true">
                        </div>
                    </div>
                    <a>${member.username}</a>
                </td>`;
            memberTable.appendChild(row);
        });
    } catch (error) {
        console.error('에러 발생:', error);
    }
}


