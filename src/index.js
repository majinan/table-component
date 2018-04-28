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
   * 把数据渲染成页面中的表格ß
   *
   * @param container - 表格容器
   * @param data - 表格数据 [[1,2,3], [4,5,6]]
   * @private
   */
  _render (container, data) {
    const tableDom = document.createElement('table')
    tableDom.className = 'xx-table'
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
   * 获取选中单元格的信息
   *
   * @returns {Array} [{row:0, col:1, value:'5'}]
   * @public
   */
  getSelectedCells () {
    return this.selectedCells
  }
}

// 渲染表格
// TODO 表格中的支持点选单元格；  点击单元格时出现一个蓝色的边框，并且通过 getSelectedCells 方法能获取到选中的单元格信息
// TODO 支持按键选中
// TODO 支持框选