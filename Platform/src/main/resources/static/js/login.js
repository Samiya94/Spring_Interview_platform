let currentRole = 'Student';

const roleSubtitles = {
  Student:     'Sign in to access your interview sessions and feedback.',
  Interviewer: 'Sign in to manage your scheduled interview sessions.',
  Institute:   'Sign in to your institute dashboard and track evaluations.',
  Mentor:      'Sign in as Department Head to oversee your department\'s evaluations.',
};

const showRegNote = {
  Student:     false,
  Interviewer: true,
  Institute:   true,
  Mentor:      true,
};

const regNoteTexts = {
  Interviewer: 'Not registered yet? <a href="register.html">Join as an Interviewer</a>',
  Institute:   'Not registered yet? <a href="register.html">Register your Institute</a>',
  Mentor:      '<i class="fa-solid fa-circle-info"></i> Mentor access is invite-only. Your account is created by your Institute from their dashboard.',
};

/* ── ROLE SELECTION ── */
function selectRole(role, el) {
  currentRole = role;

  // update buttons
  document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');

  // update subtitle
  document.getElementById('role-subtitle').textContent = roleSubtitles[role] || 'Welcome back.';

  // update button label
  document.getElementById('btnRoleLabel').textContent = role;

  // reg note
  const note = document.getElementById('regNote');
  if (showRegNote[role]) {
    note.innerHTML = `<i class="fa-solid fa-circle-info"></i><span>${regNoteTexts[role]}</span>`;
    note.classList.add('show');
  } else {
    note.classList.remove('show');
  }

  clearError();
}

/* ── TOGGLE PASSWORD ── */
function togglePw() {
  const input = document.getElementById('passwordInput');
  const icon  = document.getElementById('pwIcon');
  const isHidden = input.type === 'password';
  input.type     = isHidden ? 'text' : 'password';
  icon.className = isHidden ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
}

/* ── ERROR HELPERS ── */
function showError(msg) {
  document.getElementById('errorText').textContent = msg;
  document.getElementById('errorAlert').classList.add('show');
}
function clearError() {
  document.getElementById('errorAlert').classList.remove('show');
  document.getElementById('emailInput').classList.remove('error');
  document.getElementById('passwordInput').classList.remove('error');
}

/* ── INSTITUTE LOGIN ── */
function loginAsInstitute(email, password) {
  const allKeys   = Object.keys(localStorage).filter(k => k.startsWith('tpoCoordinators_'));
  const allCoords = allKeys.flatMap(k => JSON.parse(localStorage.getItem(k)) || []);
  const match     = allCoords.find(c =>
    c.email.toLowerCase() === email.toLowerCase() && c.password === password
  );
  if (match) {
    localStorage.setItem('currentTPO',       JSON.stringify(match));
    localStorage.setItem('currentInstitute', JSON.stringify(match));
    localStorage.setItem('loggedInUser',     JSON.stringify({ ...match, role: 'Institute' }));
    window.location.href = 'institute-dashboard.html';
    return;
  }
  if (!allCoords.length) {
    showError('No Institute accounts found. Please register your institute first.');
  } else if (!allCoords.find(c => c.email.toLowerCase() === email.toLowerCase())) {
    showError('Email not found. Please check your email or register.');
    document.getElementById('emailInput').classList.add('error');
  } else {
    showError('Incorrect password. Please try again.');
    document.getElementById('passwordInput').classList.add('error');
  }
}

/* ── MAIN LOGIN HANDLER ── */
function handleLogin(event) {
  event.preventDefault();
  clearError();

  const email    = document.getElementById('emailInput').value.trim();
  const password = document.getElementById('passwordInput').value;

  if (!email || !password) {
    showError('Please enter both email and password.');
    return;
  }

  if (currentRole === 'Institute') {
    loginAsInstitute(email, password);
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const match = users.find(u =>
    u.email === email && u.password === password && u.role === currentRole
  );

  if (match) {
    localStorage.setItem('loggedInUser', JSON.stringify(match));
    const destinations = {
      Student:     'student-dashboard.html',
      Interviewer: 'interviewer-dashboard.html',
      Mentor:      'mentor-dashboard.html',
    };
    window.location.href = destinations[currentRole] || 'index.html';
  } else {
    const emailExists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!emailExists) {
      showError('Email not found. Please check your email or register.');
      document.getElementById('emailInput').classList.add('error');
    } else {
      showError('Incorrect password or role mismatch. Please try again.');
      document.getElementById('passwordInput').classList.add('error');
    }
  }
}

/* ── AUTO-SELECT ROLE FROM URL PARAM ── */
window.addEventListener('DOMContentLoaded', () => {
  const param = new URLSearchParams(window.location.search).get('role');
  const map   = {
    student:     'role-student',
    interviewer: 'role-interviewer',
    institute:   'role-institute',
    mentor:      'role-mentor',
  };
  if (param && map[param.toLowerCase()]) {
    const btn = document.getElementById(map[param.toLowerCase()]);
    if (btn) selectRole(param.charAt(0).toUpperCase() + param.slice(1), btn);
  }
});