const hasOwn = {}.hasOwnProperty

declare type ClassValue = string | number | ClassDictionary | ClassArray

interface ClassDictionary {
  [id: string]: boolean
}

interface ClassArray extends Array<ClassValue> { }

interface ClassNamesFn {
  (...classes: ClassValue[]): string
}

export function classnames (..._classes: ClassValue[]): string {
  let classes: ClassValue[] = []

  for (let i = 0; i < arguments.length; i++) {
    let arg = arguments[i]
    if (!arg) {
      continue
    }

    const argType = typeof arg

    if (argType === 'string' || argType === 'number') {
      classes.push(arg)
    } else if (Array.isArray(arg)) {
      classes.push(classnames.apply(null, arg))
    } else if (argType === 'object') {
      for (let key in arg) {
        if (hasOwn.call(arg, key) && arg[key]) {
          classes.push(key)
        }
      }
    }
  }

  return classes.join(' ')
}
