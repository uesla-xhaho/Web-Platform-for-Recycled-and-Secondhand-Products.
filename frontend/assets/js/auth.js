document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const fixedEmail = 'terezagega@gmail.com';
  const fixedPassword = '12345';

  loginForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const email = String(formData.get('email') || '')
      .trim()
      .toLowerCase();
    const password = String(formData.get('password') || '').trim();

    if (email === fixedEmail && password === fixedPassword) {
      API.setSession({
        token: 'local-artisan-token',
        user: {
          id: 'local-terezagega',
          name: 'Tereza Gega',
          email: fixedEmail,
          role: 'artisan',
          location: 'Tirane',
          bio: 'Krijuese e produkteve te ricikluara dhe artizanale.',
        },
      });
      UI.showToast('Mire se erdhe, Tereza');
      setTimeout(() => (window.location.href = './artisan.html'), 300);
      return;
    }

    UI.showToast('Email ose password i pasakte.');
  });

  registerForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(registerForm);

    try {
      const payload = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        role: formData.get('role'),
        location: formData.get('location'),
        bio: formData.get('bio'),
      };

      const data = await API.apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      API.setSession(data);
      UI.showToast('Llogaria u krijua');
      setTimeout(() => (window.location.href = './index.html'), 350);
    } catch (error) {
      UI.showToast(error.message);
    }
  });
});
