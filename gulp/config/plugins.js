import notify from 'gulp-notify';
import browserSync from 'browser-sync';
import plumber from 'gulp-plumber';
import ifPlugin from 'gulp-if';
import newer from 'gulp-newer';
import size from 'gulp-size';

export default {
  plumber,      // Обработка ошибок
  notify,       // Сообщения
  browserSync,  // Локальный сервер
  ifPlugin,     // Условное ветление
  newer,        // Проверка обновления
  size,
}