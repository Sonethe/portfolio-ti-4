'use strict';

const skillList     = document.querySelector('dl.skill-list'),
      skillSection  = document.querySelector('.skills'),
      sortBtns      = document.querySelector('div.skills-sort'),
      navMenu       = document.querySelector('.main-nav'),
      navBtn        = document.querySelector('.nav-btn'),
      body          = document.body,
      switchThemeCB = document.querySelector('input.switch-checkbox');

const skills = {
  isSort: false,

  data: [],

  generateList(parentElement) {
    parentElement.innerHTML = '';
    
    this.data.forEach((skill) => {
      const   dt  = document.createElement('dt'),
              dd  = document.createElement('dd'),
              div = document.createElement('div');

      dt.classList.add('skill-item');
      dd.classList.add('skill-level');
    
      dt.textContent = skill.name;
      dt.style.backgroundImage = `url(img/icons_svg/skills/${skill.icon})`;
      div.textContent = `${skill.level}%`;
      div.style.width = `${skill.level}%`;
    
      dd.append(div);
      parentElement.append(dt, dd);
    });
  },

  sortList(type) {
    if(this.isSort !== type) {
      this.data.sort(getComparer(type));
      skills.isSort = type;
    } else {
      this.data.reverse();
    }

    skills.generateList(skillList);
  },

  initList(url, parentElement, skillSection) {
    fetch(url)
      .then(data => data.json())
      .then(object => {
        this.data = object;
        this.generateList(parentElement);
      })
      .catch(() => {
        console.error('Something went wrong');
        skillSection.remove();
      });
  }
};

const menu = {
  closeMenu() {
    navMenu.classList.add('main-nav_closed');
    navBtn.classList.remove('nav-btn_close');
    navBtn.classList.add('nav-btn_open');
    navBtn.innerHTML = '<span class="visually-hidden">Открыть меню</span>';
  },
  
  openMenu() {
    navMenu.classList.remove('main-nav_closed');
    navBtn.classList.remove('nav-btn_open');
    navBtn.classList.add('nav-btn_close');
    navBtn.innerHTML = '<span class="visually-hidden">Закрыть меню</span>';
  },
};

function getComparer(prop) {
  return function (a,b) {
    if(a[prop] < b[prop]) {
      return -1;
    }

    if(a[prop] > b[prop]) {
      return 1;
    }

    return 0;
  }
};

sortBtns.addEventListener('click', (e) => {
  let target = e.target,
      type   = target.dataset.type;

  if(target.nodeName === "BUTTON") {
    switch(type) {

      case 'name':
        skills.sortList(type);
        break;

      case 'level':
        skills.sortList(type);
        break;

      default:
        console.log('unknown button');
    }
  }
});

navBtn.addEventListener('click', (e) => {
  if(e.target.classList.contains('nav-btn_open')) {
    menu.openMenu();
  } else {
    menu.closeMenu();
  }
});

switchThemeCB.addEventListener('change', (e) => {
  if(e.target.checked == true) {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
  } else {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
  }

  localStorage.setItem('themeCB', e.target.checked);
});

function setLSTheme() {
  if(localStorage.getItem('themeCB') == 'true') {
    switchThemeCB.checked = true;
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
  } else {
    switchThemeCB.checked = false;
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
  }
};

skills.initList("db/skills.json", skillList, skillSection);
setLSTheme();
menu.closeMenu();
