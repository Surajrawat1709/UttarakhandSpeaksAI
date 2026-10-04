import axios from 'axios';

const API_BASE = '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Attach auth token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── Chat / Llama API ──────────────────────────────────────────────────────────
export const llamaApi = {
  getInitResponse: () => api.get('/'),

  queryPrompt: (username: string, animename: string, prompt: string) =>
    api.post<{ response: string }>(
      `/api/predict?username=${encodeURIComponent(username)}&animename=${encodeURIComponent(animename)}`,
      { message: prompt }
    ),

  createUser: (username: string, name: string) =>
    api.post<{ message: string }>(
      `/api/login/?username=${encodeURIComponent(username)}`,
      { name }
    ),

  createAnime: (animename: string, name: string, characteristics: string) =>
    api.post<{ message: string }>(
      `/api/select_anime/?animename=${encodeURIComponent(animename)}`,
      { name, characteristics }
    ),

  createChat: (username: string, animename: string, scenario: string) =>
    api.get<{ response: string }>(
      `/api/initchat?username=${encodeURIComponent(username)}&animename=${encodeURIComponent(animename)}&scenario=${encodeURIComponent(scenario)}`
    ),

  createCustom: (
    animeName: string,
    scene: string,
    view: string,
    clothing: string,
    action: string
  ) =>
    api.post<{ response: string }>(
      `/api/custom?animeName=${encodeURIComponent(animeName)}`,
      { scene, view, clothing, action }
    ),
};

// ─── Auth API ──────────────────────────────────────────────────────────────────
export const authApi = {
  register: (body: { firstname: string; lastname: string; email: string; password: string }) =>
    api.post('/auth/register', body),

  authenticate: (body: { email: string; password: string }) =>
    api.post<{ token: string }>('/auth/authenticate', body),
};

// ─── Payment API ───────────────────────────────────────────────────────────────
export const paymentApi = {
  createOrder: (order: { name: string; email: string; phone: string; amount: string }) =>
    axios.post<{
      secretId: string;
      razorpayOrderId: string;
      applicationFee: string;
      pgName: string;
    }>('http://localhost:8080/pg/createOrder', {
      customerName: order.name,
      email: order.email,
      phoneNumber: order.phone,
      amount: order.amount,
    }),
};

export default api;
