'use strict';

const skillList   = document.querySelector('dl.skill-list'),
      sortBtns    = document.querySelector('div.skills-sort'),
      navMenu     = document.querySelector('.main-nav'),
      navBtn      = document.querySelector('.nav-btn'),
      bodyTheme   = document.querySelector('body'),
      chechBox    = document.querySelector('input.switch-checkbox');

let skills = {
  isSort: false,

  data: [
    {
      name: 'html',
      level: 10,
      icon: 'html.svg'
    },
    {
      name: 'css',
      level: 12,
      icon: 'css.svg'
    },
    {
      name: 'python',
      level: 5,
      icon: 'python.svg'
    },
    {
      name: 'java',
      level: 42,
      icon: 'java.svg'
    }
  ],

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
};

let menu = {
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

skills.generateList(skillList);

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

chechBox.addEventListener('change', (e) => {
  if(e.target.checked == true) {
    bodyTheme.classList.remove('dark-theme');
    bodyTheme.classList.add('light-theme');
  } else {
    bodyTheme.classList.remove('light-theme');
    bodyTheme.classList.add('dark-theme');
  }

  localStorage.setItem('checked', e.target.checked);
});

function localStorageTheme() {
  if(localStorage.getItem('checked') == 'true') {
    chechBox.checked = true;
    bodyTheme.classList.remove('dark-theme');
    bodyTheme.classList.add('light-theme');
  } else {
    chechBox.checked = false;
    bodyTheme.classList.remove('light-theme');
    bodyTheme.classList.add('dark-theme');
  }
};

localStorageTheme();
