'use strict';

/*
  Создайте скрипт секундомера.  
  По ссылке можно посмотреть пример выбрав Stopwatch http://www.online-stopwatch.com/full-screen-stopwatch/

  Изначально в HTML есть разметка:

  <div class="stopwatch">
    <p class="time js-time">00:00.0</p>
    <button class="btn js-start">Start</button>
    <button class="btn js-take-lap">Lap</button>
    <button class="btn js-reset">Reset</button>
  </div>
  <ul class="laps js-laps"></ul>

  Добавьте следующий функционал:

  - При нажатии на кнопку button.js-start, запускается таймер, который считает время 
    со старта и до текущего момента времени, обновляя содержимое элемента p.js-time 
    новым значение времени в формате xx:xx.x (минуты:секунды.сотни_миллисекунд).

    Подсказка:  так как необходимо отображать только сотни миллисекунд, интервал
                достаточно повторять не чаще чем 1 раз в 100 мс.

  - Когда секундомер запущен, текст кнопки button.js-start меняется на 'Pause', 
    а функционал при клике превращается в оставновку секундомера без сброса 
    значений времени.

    Подсказка: вам понадобится буль который описывает состояние таймера активен/неактивен.

  - Если секундомер находится в состоянии паузы, текст на кнопке button.js-start
    меняется на 'Continue'. При следующем клике в нее, продолжается отсчет времени, 
    а текст меняется на 'Pause'. То есть если во время нажатия 'Pause' прошло 6 секунд 
    со старта, при нажатии 'Continue' 10 секунд спустя, секундомер продолжит отсчет времени 
    с 6 секунд, а не с 16. 

    Подсказка:  сохраните время секундомера на момент паузы и используйте его 
                при рассчете текущего времени после возобновления таймера отнимая
                это значение от времени запуска таймера.

  - Если секундомер находится в активном состоянии или в состоянии паузы, кнопка 
    button.js-reset должна быть активна (на нее можно кликнуть), в противном случае
    disabled. Функционал при клике - остановка таймера и сброс всех полей в исходное состояние.

  - Функционал кнопки button.js-take-lap при клике - сохранение текущего времени секундомера 
    в массив и добавление в ul.js-laps нового li с сохраненным временем в формате xx:xx.x
*/

// const clockface = document.querySelector(".js-time");
// const startBtn = document.querySelector(".js-start");
// const resetBtn = document.querySelector(".js-reset");
// const loopBtn = document.querySelector(".js-take-lap");
// const lapsList = document.querySelector(".js-laps");

// let my_interval;

// const timer = {
//   startTime: null,
//   deltaTime: null,
//   pauseTime: null,
//   isActive: false,
//   isPause: false,
//   lapsCount: 0
// };

// function startTimer() {
//   resetBtn.disabled = false;
//   if(!timer.isActive) {
//     startBtn.innerHTML = 'Pause';
//     timer.isActive = true;
//     timer.startTime = Date.now();
//     my_interval = setInterval(()=>{
//       timer.deltaTime = Date.now() - timer.startTime;
//       updateClockface(clockface, timer.deltaTime);
//     }, 100);
//   }
//   else {
//     if(!timer.isPause) {
//       timer.isPause = true;
//       timer.pauseTime = timer.deltaTime;
//       startBtn.innerHTML = 'Continue';
//       clearInterval(my_interval);
//     }
//     else {
//       startBtn.innerHTML = 'Pause';
//       timer.isPause = false;
//       timer.startTime = Date.now() - timer.pauseTime;
//       my_interval = setInterval(()=>{
//         timer.deltaTime = Date.now() - timer.startTime;
//         updateClockface(clockface, timer.deltaTime);
//       }, 100);
//     }
//   }
// }

// function resetTimer() {
//   clearInterval(my_interval);
//   timer.isActive = false;
//   timer.isPause = false;
//   updateClockface(clockface, 0);
//   lapsList.innerHTML = '';
//   timer.lapsCount = 0;
//   startBtn.innerHTML = 'Start';
//   startBtn.disabled = false;
//   resetBtn.disabled = true;
// }

// function takeLoop() {
//   if(!timer.isPause && timer.isActive) {
//     timer.lapsCount++;
//     lapsList.innerHTML += `<li>${timer.lapsCount} -> ${clockface.innerHTML}</li>`;
//   }
// }

// startBtn.addEventListener('click', startTimer);
// resetBtn.addEventListener('click', resetTimer);
// loopBtn.addEventListener('click', takeLoop);

// function getFormattedTime(time) {
//   var date = new Date(time);
//   var min = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes(),
//       sec = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds(),
//       millisecx100 = Math.floor(date.getMilliseconds()/100);
//   return `${min}:${sec}.${millisecx100}`;
// }

// function updateClockface(elem, time) {
//   elem.textContent = getFormattedTime(time);
// }

/*
  ЗАДАНИЕ ПОВЫШЕННОЙ СЛОЖНОСТИ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ

  Выполните домашнее задание используя класс с полями и методами.

  На вход класс Stopwatch принимает только ссылку на DOM-узел в котором будет 
  динамически создана вся разметка для секундомера.

  Должна быть возможность создать сколько угодно экземпляров секундоментов 
  на странице и все они будут работать независимо.

  К примеру:

  new Stopwatch(parentA);
  new Stopwatch(parentB);
  new Stopwatch(parentC);

  Где parent* это существующий DOM-узел. 
*/

function Stopwatch (DOMLink) {
  this.DOMLink = DOMLink;
  this.DOMLink.innerHTML = '<p class="time js-time">00:00.0</p><button class="btn js-start">Start</button>\
    <button class="btn js-take-lap">Lap</button>\
    <button class="btn js-reset">Reset</button><ul class="laps js-laps"></ul>';
  this.clockface = this.DOMLink.querySelector(".js-time");
  this.startBtn = this.DOMLink.querySelector(".js-start");
  this.resetBtn = this.DOMLink.querySelector(".js-reset");
  this.loopBtn = this.DOMLink.querySelector(".js-take-lap");
  this.lapsList = this.DOMLink.querySelector(".js-laps");
  this.timer = {
    startTime: null,
    deltaTime: null,
    pauseTime: null,
    isActive: false,
    isPause: false,
    lapsCount: 0
  };
  this.interval = null;
  this.startBtn.addEventListener('click', () => {
    this.resetBtn.disabled = false;
    if(!this.timer.isActive) {
      this.startBtn.innerHTML = 'Pause';
      this.timer.isActive = true;
      this.timer.startTime = Date.now();
      this.interval = setInterval(()=>{
        this.timer.deltaTime = Date.now() - this.timer.startTime;
        this.updateClockface(this.clockface, this.timer.deltaTime);
      }, 100);
    }
    else {
      if(!this.timer.isPause) {
        this.timer.isPause = true;
        this.timer.pauseTime = this.timer.deltaTime;
        this.startBtn.innerHTML = 'Continue';
        clearInterval(this.interval);
      }
      else {
        this.startBtn.innerHTML = 'Pause';
        this.timer.isPause = false;
        this.timer.startTime = Date.now() - this.timer.pauseTime;
        this.interval = setInterval(()=>{
          this.timer.deltaTime = Date.now() - this.timer.startTime;
          this.updateClockface(this.clockface, this.timer.deltaTime);
        }, 100);
      }
    }
  });
  this.resetBtn.addEventListener('click', () => {
    clearInterval(this.interval);
    this.timer.isActive = false;
    this.timer.isPause = false;
    this.updateClockface(this.clockface, 0);
    this.lapsList.innerHTML = '';
    this.timer.lapsCount = 0;
    this.startBtn.innerHTML = 'Start';
    this.startBtn.disabled = false;
    this.resetBtn.disabled = true;
  });
  this.loopBtn.addEventListener('click', () => {
    if(!this.timer.isPause && this.timer.isActive) {
      this.timer.lapsCount++;
      this.lapsList.innerHTML += `<li>${this.timer.lapsCount} -> ${this.clockface.innerHTML}</li>`;
    }
  });
}

Stopwatch.prototype.updateClockface = function updateClockface(elem, time) {
  elem.textContent = this.getFormattedTime(time);
}

Stopwatch.prototype.getFormattedTime = function getFormattedTime(time) {
  let date = new Date(time);
  let min = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes(),
    sec = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds(),
    millisecx100 = Math.floor(date.getMilliseconds()/100);
  return `${min}:${sec}.${millisecx100}`;
}

const parentArrey = document.querySelectorAll(".stopwatch");

parentArrey.forEach(element => {
  const stopwatch1 = new Stopwatch(element);
});
