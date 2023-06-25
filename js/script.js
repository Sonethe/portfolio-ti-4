'use strict';

const skillList = document.querySelector('dl.skill-list');

let skills = {
  data: [
    {
      name: 'html',
      level: 10,
      class: 'skill-item_html',
      icon: 'html.svg'
    },
    {
      name: 'css',
      level: 12,
      class: 'skill-item_css',
      icon: 'css.svg'
    },
    {
      name: 'python',
      level: 5,
      class: 'skill-item_python',
      icon: 'python.svg'
    },
    {
      name: 'java',
      level: 42,
      class: 'skill-item_java',
      icon: 'java.svg'
    }
  ],
  generateist(parentElement) {
    
    this.data.forEach((skill) => {
      const   dt = document.createElement('dt'),
              dd = document.createElement('dd'),
              div = document.createElement('div');

      dt.classList.add('skill-item', skill.class);
      dd.classList.add('skill-level');
    
      dt.textContent = skill.name;
      dt.style.backgroundImage = `url(img/icons_svg/skills/${skill.icon})`;
      div.textContent = `${skill.level}%`;
      div.style.width = `${skill.level}%`;
    
      dd.append(div);
      parentElement.append(dt);
      parentElement.append(dd);
    });
  },
};

skills.generateist(skillList);

let   page = document.querySelector('.page'),
      themeButton = document.querySelector('.theme-button');

themeButton.onclick = function() {
  page.classList.toggle('light-theme');
  page.classList.toggle('dark-theme');
};
