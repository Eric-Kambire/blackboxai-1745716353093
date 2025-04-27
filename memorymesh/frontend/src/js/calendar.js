document.addEventListener('DOMContentLoaded', () => {
    // Modal functions
    window.showCreateQuizModal = () => {
        const modal = document.getElementById('createQuizModal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    };

    window.hideCreateQuizModal = () => {
        const modal = document.getElementById('createQuizModal');
        if (modal) {
            modal.classList.add('hidden');
        }
    };

    // Handle form submission
    const scheduleQuizForm = document.getElementById('scheduleQuizForm');
    if (scheduleQuizForm) {
        scheduleQuizForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(scheduleQuizForm);
            const quizData = {
                title: formData.get('title'),
                date: formData.get('date'),
                time: formData.get('time'),
                audio: formData.get('audio'),
                questionTypes: Array.from(formData.getAll('questionTypes')),
                numQuestions: formData.get('numQuestions'),
                timeLimit: formData.get('timeLimit')
            };

            // Add quiz to calendar (mock implementation)
            console.log('Scheduling quiz:', quizData);
            
            // Add visual feedback
            const day = document.querySelector(`.calendar-day:not(.text-gray-400)`);
            if (day) {
                day.classList.add('has-event');
            }

            // Add to upcoming list
            const upcomingList = document.querySelector('.space-y-6');
            if (upcomingList) {
                const newQuiz = document.createElement('div');
                newQuiz.className = 'p-3 bg-gray-50 rounded-lg';
                newQuiz.innerHTML = `
                    <p class="text-sm font-medium">${quizData.title}</p>
                    <p class="text-xs text-text-secondary">${quizData.date} ${quizData.time}</p>
                    <div class="flex gap-2 mt-2">
                        <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">${quizData.timeLimit} min</span>
                        <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">${quizData.numQuestions} Q</span>
                    </div>
                `;
                upcomingList.insertBefore(newQuiz, upcomingList.firstChild);
            }

            // Hide modal
            hideCreateQuizModal();
        });
    }

    // Calendar navigation (mock implementation)
    const prevMonthBtn = document.querySelector('.calendar-nav-prev');
    const nextMonthBtn = document.querySelector('.calendar-nav-next');
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', () => {
            console.log('Navigate to previous month');
        });
    }
    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', () => {
            console.log('Navigate to next month');
        });
    }

    // Calendar day click handler
    const calendarDays = document.querySelectorAll('.calendar-day');
    calendarDays.forEach(day => {
        day.addEventListener('click', () => {
            calendarDays.forEach(d => d.classList.remove('selected'));
            day.classList.add('selected');
        });
    });
});
