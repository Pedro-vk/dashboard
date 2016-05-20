import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { isScalar } from 'utils/graphql'
import { valueToString, stringToValue } from './utils'
import classes from './Cell.scss'

export default class NewCell extends React.Component {

  static propTypes = {
    field: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    update: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props)

    this.state = {
      value: null,
    }
  }

  _updateValue (inputValue) {
    const value = stringToValue(inputValue, this.props.field)
    this.setState({ value })
    this.props.update(value, this.props.field)
  }

  _renderContent () {
    if (this.props.field.fieldName === 'id') {
      return (
        <span>Id will be generated</span>
      )
    }

    const valueString = valueToString(this.state.value, this.props.field, false)

    switch (this.props.field.typeIdentifier) {
      case 'Int':
        return (
          <input
            autoFocus={this.props.index === 1}
            type='number'
            defaultValue={valueString}
            onChange={(e) => this._updateValue(e.target.value)}
            onKeyDown={(e) => e.keyCode === 13 ? this.props.submit() : null}
          />
        )
      case 'Float':
        return (
          <input
            autoFocus={this.props.index === 1}
            type='number'
            step='any'
            defaultValue={valueString}
            onChange={(e) => this._updateValue(e.target.value)}
            onKeyDown={(e) => e.keyCode === 13 ? this.props.submit() : null}
          />
        )
    }

    if (isScalar(this.props.field.typeIdentifier)) {
      return (
        <input
          autoFocus={this.props.index === 1}
          type='text'
          ref='input'
          defaultValue={valueString}
          onChange={(e) => this._updateValue(e.target.value)}
          onKeyDown={(e) => e.keyCode === 13 ? this.props.submit() : null}
        />
      )
    }

    return (
      <span>nope</span>
    )
  }

  render () {
    const rootClassnames = classnames({
      [classes.root]: true,
      [classes.null]: this.props.field.fieldName === 'id',
      [classes.invalid]: (
        (this.props.field.isRequired && this.state.value === null) &&
        this.props.field.fieldName !== 'id'
      ),
    })

    return (
      <div
        style={{ width: this.props.width }}
        className={rootClassnames}
      >
        {this._renderContent()}
      </div>
    )
  }
}
