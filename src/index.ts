import { Fragment, jsx, jsxDEV } from 'vue/jsx-runtime'
import { toJsxRuntime } from 'hast-util-to-jsx-runtime'

import type { VNode } from 'vue'
import type { Root } from 'hast'
import type { Plugin, Processor } from 'unified'

import type { ComponentsWithoutNodeOptions } from './complex-types'

export type Options = ComponentsWithoutNodeOptions

export const rehypeVue: Plugin<[(Options | undefined)?], Root, VNode> = function (this: Processor, options) {
  this.Compiler = (node) => {
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
