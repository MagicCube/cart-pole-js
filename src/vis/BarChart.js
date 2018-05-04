import './BarChart.less';

export default class BarChart {
  constructor(parent) {
    this.element = document.createElement('div');
    this.element.className = 'cp-bar-chart';
    parent.appendChild(this.element);
  }

  append(episode, reward) {
    const row = document.createElement('div');
    row.className = 'row';
    row.innerHTML = `<div class=episode>#${episode}</div><div class=bar style="width: ${reward / 200 < 1 ? reward / 200 * 100 : 100}%"><div class="reward">${reward}</div></div>`;
    this.element.appendChild(row);
  }
}
