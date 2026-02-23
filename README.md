# 🛍️ Vasthramalika – Full Stack E-Commerce Web Application

Vasthramalika is a full-stack e-commerce web application built using Django (Backend) and React + Vite (Frontend).

This project supports product management, category handling, admin control, and frontend product display.

---

## 🔥 Tech Stack

### Backend
- Python
- Django
- Django REST Framework
- SQLite / PostgreSQL
- Custom Management Commands

### Frontend
- React
- Vite
- JavaScript
- CSS

### Deployment
- Render

---

## 📁 Project Structure

vasthramalika2/
│
├── backend/
│ ├── vasthramalika/
│ ├── product/
│ ├── manage.py
│ ├── requirements.txt
│ └── build.sh
│
├── frontend/
│ ├── src/
│ ├── public/
│ ├── package.json
│ └── vite.config.js
│
└── README.md


---

## ⚙️ Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

cd frontend
npm install
npm run dev

👤 Features

User Authentication

Product Category Management

Admin Dashboard

API Integration

Responsive UI

Custom Product Population Scripts

Full Backend + Frontend Integration
