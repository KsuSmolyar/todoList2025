# 📝 Todo List App

Интерактивное веб-приложение для управления списком задач с поддержкой категорий, дедлайнов, сортировки, drag-and-drop, и напоминаний через уведомления.

## 🚀 Функциональность

- ✅ Добавление, редактирование, удаление задач
- 📂 Категории задач: `работа`, `учёба`, `дом`
- ⏰ Назначение дедлайна через `react-datepicker`
- 🔔 Уведомление о дедлайне за 5 минут до его наступления (через `Notification API`)
- 📦 Сохранение задач и настроек в `localStorage`
- 🔀 Drag-and-drop сортировка задач (через `@hello-pangea/dnd`)
- 🌓 Поддержка светлой и тёмной темы
- 🔍 Фильтрация и сортировка по статусу, категории, дате

## 🧑‍💻 Технологии

- React + TypeScript
- CSS Modules
- React Context API
- React Hooks (в том числе пользовательские: `useLocalStorage`, `useToggle`, `useClickOutside`)
- `@hello-pangea/dnd` — для drag-and-drop
- `react-datepicker` — для выбора даты и времени
- `date-fns` — для форматирования дат

## 📦 Установка

```bash
git clone https://github.com/KsuSmolyar/todo-list-app.git
cd todo-list-app
npm install
npm run dev
