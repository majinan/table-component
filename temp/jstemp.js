class Table {
  /**
   * 构造函数
   *
   * @param root - 选择器或者 dom 对象
   * @param [options] - 可选的参数
   */
  constructor (root, options) {
    if (typeof root === 'string') {
      root = document.querySelector(root)
    }
    const {data} = options

    this.container = document.createElement('div')
    this.container.className = 'xx-table-container'
    root.appendChild(this.container)

    this._render(this.container, data)

    this.selectedCells = [] // 选中的单元格
  }

  /**
   * 把数据渲染成页面中的表格
   *
   * @param container - 表格容器
   * @param data - 表格数据
   * @private
   */
  _render (container, data) {
    const tableDom = document.createElement('table')
    tableDom.className = 'xx-table'
    tableDom.onclick = this._onClickTable.bind(this)
    data.forEach(row => {
      const tr = document.createElement('tr')
      row.forEach(col => {
        const td = document.createElement('td')
        td.innerHTML = col
        tr.appendChild(td)
      })
      tableDom.appendChild(tr)
    })
    container.appendChild(tableDom)

  }

  /**
   * 处理表格上的点击事件
   * @param e
   * @private
   */
  _onClickTable (e) {
    const borders = this._getBorders()
    borders.render(e.target)
  }

  _getBorders () {
    if (!this.borders) {
      this.borders = new Borders(this.container)
    }
    return this.borders
  }

  getSelectedCells () {

  }
}

class Borders {
  constructor (contaienr) {
    const dom = this.dom = document.createElement('div')
    dom.className = 'xx-table-border'
    contaienr.appendChild(dom)

    document.onclick = e => {
      const target = e.target
      if (target.tagName !== 'TD') {
        dom.style.display = 'none'
      }
    }
  }

  render (td) {
    const {clientWidth, clientHeight, offsetTop, offsetLeft} = td
    const dom = this.dom
    Object.assign(dom.style, {
      width: clientWidth - 1 + 'px',
      height: clientHeight - 1 + 'px',
      top: offsetTop + 'px',
      left: offsetLeft + 'px',
      display: 'block',
    })
  }
}