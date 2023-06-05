'use strict';

const   data = [
          {name: 'html',   level: 40, class: 'skill-item_html',   icon: 'html.svg'},
          {name: 'css',    level: 45, class: 'skill-item_css',    icon: 'css.svg'},
          {name: 'python', level: 20, class: 'skill-item_python', icon: 'python.svg'},
          {name: 'java',   level: 58, class: 'skill-item_java',   icon: 'java.svg'}
        ],
        skillList = document.querySelector('dl.skill-list');

let   page = document.querySelector('.page'),
      themeButton = document.querySelector('.theme-button');

console.log(skillList);

data.forEach(skill => {
  const   dt = document.createElement('dt'),
          dd = document.createElement('dd'),
          div = document.createElement('div');

  dt.classList.add('skill-item', skill.class);
  dd.classList.add('skill-level');

  dt.textContent = skill.name;
  dt.style.backgroundImage = `url(../img/icons_svg/skills/${skill.icon})`;
  div.textContent = `${skill.level}%`;
  div.style.width = `${skill.level}%`;

  dd.append(div);
  skillList.append(dt);
  skillList.append(dd);

});

themeButton.onclick = function() {
  page.classList.toggle('light-theme');
  page.classList.toggle('dark-theme');
};
