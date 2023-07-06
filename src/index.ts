import { Fragment, jsx, jsxDEV } from 'vue/jsx-runtime'
import { toJsxRuntime } from 'hast-util-to-jsx-runtime'

// @ts-expect-error: no declaration files
import tableCellStyle from '@mapbox/hast-util-table-cell-style'

import type { VNode } from 'vue'
import type { Root } from 'hast'
import type { Plugin, Processor } from 'unified'

import type { ComponentsWithNodeOptions, ComponentsWithoutNodeOptions } from './complex-types'

interface SharedOptions {
  fixTableCellAlign?: boolean
}

export type Options = SharedOptions & (ComponentsWithNodeOptions | ComponentsWithoutNodeOptions)

export const rehypeVue: Plugin<[(Options | undefined)?], Root, VNode> = function (this: Processor, options) {
  this.Compiler = (_node) => {
    let node = _node
    if (options?.fixTableCellAlign)
      node = tableCellStyle(node)

    // @ts-expect-error this works...
    return toJsxRuntime(node, {
      Fragment,
      jsx,
      jsxs: jsx,
      jsxDEV,
      development: false,
      elementAttributeNameCase: 'html',
      ...options,
    })
  }
}
