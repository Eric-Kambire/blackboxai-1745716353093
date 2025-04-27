// Tailwind Configuration
tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                'inter': ['Inter', 'sans-serif'],
            },
            colors: {
                'bg-primary': '#F7F9F6',
                'accent-primary': '#C7F0DA',
                'text-primary': '#1F2937',
                'text-secondary': '#6B7280',
                'icon-active': '#4ADE80',
                'border': '#E5E7EB',
            }
        }
    }
};

// Auth Tabs Functionality
function setupAuthTabs() {
    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    if (loginTab && signupTab) {
        loginTab.addEventListener('click', () => {
            loginTab.classList.add('active');
            signupTab.classList.remove('active');
            loginForm.classList.remove('hidden');
            signupForm.classList.add('hidden');
        });

        signupTab.addEventListener('click', () => {
            signupTab.classList.add('active');
            loginTab.classList.remove('active');
            signupForm.classList.remove('hidden');
            loginForm.classList.add('hidden');
        });
    }
}

// Quiz Input Validation
function setupQuizValidation() {
    const quizInputs = document.querySelectorAll('.quiz-input');
    
    quizInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const value = e.target.value.trim();
            if (value) {
                input.classList.add('border-icon-active');
            } else {
                input.classList.remove('border-icon-active');
            }
        });
    });
}

// Calendar Event Handling
function setupCalendarEvents() {
    const calendarDays = document.querySelectorAll('.calendar-day');
    
    calendarDays.forEach(day => {
        day.addEventListener('click', () => {
            // Remove previous selection
            document.querySelector('.calendar-day.selected')?.classList.remove('selected');
            // Add new selection
            day.classList.add('selected');
        });
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupAuthTabs();
    setupQuizValidation();
    setupCalendarEvents();

    // Quiz form submission handler
    const quizForm = document.getElementById('quizForm');
    if (quizForm) {
        quizForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const fileInput = document.getElementById('fileInput');
            const modeInput = document.querySelector('input[name="mode"]:checked');
            if (!fileInput.files.length) {
                alert('Please select a file.');
                return;
            }
            const formData = new FormData();
            formData.append('file', fileInput.files[0]);
            formData.append('mode', modeInput ? modeInput.value : 'both');

            try {
                const response = await fetch('/api/generate_quiz_from_revision', {
                    method: 'POST',
                    body: formData
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    alert('Error: ' + (errorData.error || 'Unknown error'));
                    return;
                }
                const data = await response.json();
                displayResults(data);
            } catch (error) {
                alert('Network error: ' + error.message);
            }
        });
    }
});

function displayResults(data) {
    const resultsSection = document.getElementById('resultsSection');
    const summaryDiv = document.getElementById('summaryResult');
    const quizDiv = document.getElementById('quizResult');

    if (data.summary) {
        summaryDiv.innerHTML = `<h3 class="text-lg font-semibold mb-2">Summary</h3><p>${data.summary}</p>`;
    } else {
        summaryDiv.innerHTML = '';
    }

    if (data.quiz_data && data.quiz_data.length) {
        let quizHtml = '<h3 class="text-lg font-semibold mb-2">Quiz</h3>';
        data.quiz_data.forEach((q, idx) => {
            quizHtml += `<div class="mb-4"><p><strong>Q${idx + 1}:</strong> ${q.question}</p><ul class="list-disc list-inside">`;
            for (const optKey in q.options) {
                quizHtml += `<li>${optKey}: ${q.options[optKey]}</li>`;
            }
            quizHtml += `</ul></div>`;
        });
        quizDiv.innerHTML = quizHtml;
    } else {
        quizDiv.innerHTML = '';
    }

    resultsSection.classList.remove('hidden');
}
