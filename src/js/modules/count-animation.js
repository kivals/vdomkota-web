let observer = new IntersectionObserver(onEntries);

// Список Dom элементов для анимации
const digitNodes = document.querySelectorAll('.count__digit');
// Вешаем слушателя на каждый элемент
digitNodes.forEach(node => observer.observe(node))

/**
 * Показать анимационное увеличивающиеся числовое значение в элементе
 * @param el элемент для рендера числа
 * @param time общее время анимации
 * @param step шаг увеличения
 */
function renderDigitAnimation(el, time, step) {
  const targetDigit = Number(el.innerHTML);
  const delay = Math.round(time / (targetDigit / step));
  let digit = 0;
  const interval = setInterval(() => {
    digit = digit + step;
    if (digit >= targetDigit) {
      clearInterval(interval);
      el.innerHTML = targetDigit;
      return;
    }
    el.innerHTML = digit;
  }, delay)
}

/**
 * Слушатель события появления элементов
 * @param entries массив слушаемых элементов
 * @param observer слушатель
 */
function onEntries (entries, observer) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;
    // Отключаем слушателя после первого срабатывания
    observer.unobserve(entry.target);
    renderDigitAnimation(entry.target, 1000, 2);
  });
}
