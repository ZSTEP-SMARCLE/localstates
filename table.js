class Timetable {
    constructor(userId, userName) {
        this.userId = userId;
        this.userName = userName;
        this.apiUrl = 'http://127.0.0.1:5001/get_timetable';
        this.tableBody = document.getElementById('timetableBody');
        this.userInfoDiv = document.getElementById('userInfo');
    }

    displayUserInfo() {
        this.userInfoDiv.textContent = `현재 사용자: ID - ${this.userId}, 이름 - ${this.userName}`;
    }

    fetchTimetable() {
        fetch(this.apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: this.userId }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                this.renderTimetable(data.timetable);
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    }

    renderTimetable(timetable) {
        const timeSlots = Array.from({ length: 30 }, (_, i) => {
            const hours = 9 + Math.floor(i / 2);
            const minutes = i % 2 === 0 ? '00' : '30';
            return `${hours}:${minutes}`;
        });

        timeSlots.forEach(slot => {
            const row = document.createElement('tr');
            const timeCell = document.createElement('td');
            timeCell.textContent = slot;
            row.appendChild(timeCell);

            for (let day = 1; day <= 5; day++) {
                const cell = document.createElement('td');
                const entry = timetable.find(item => item.time.startsWith(slot) && item.day === day);
                cell.textContent = entry ? entry.class_name : '';
                row.appendChild(cell);
            }

            this.tableBody.appendChild(row);
        });
    }
}
