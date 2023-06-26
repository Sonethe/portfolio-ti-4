'use strict';

const skillList   = document.querySelector('dl.skill-list'),
      sortBtns    = document.querySelector('div.skills-sort'),
      page        = document.querySelector('.page'),
      themeButton = document.querySelector('.theme-button');

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
      const   dt = document.createElement('dt'),
              dd = document.createElement('dd'),
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
      this.data.sort(this.getComparer(type));
      skills.isSort = type;
    } else {
      this.data.reverse();
    }

    skills.generateList(skillList);
  },

  getComparer(prop) {
    return function (a,b) {
      if(a[prop] < b[prop]) {
        return -1;
      }

      if(a[prop] > b[prop]) {
        return 1;
      }

      return 0;
    }
  },
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

themeButton.onclick = function() {
  page.classList.toggle('light-theme');
  page.classList.toggle('dark-theme');
};
