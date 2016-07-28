import React from 'react'
import { action } from 'mobx'
import { observer, observable } from 'mobx-react'

import userLocation from '../../models/user-location.js'
import locations from '../../models/locations.js'

const handleChange = (idx) => action(({ target: { value } }) => {
  value = value.trim() === '' ? '0' : value
  userLocation[idx] = parseFloat(value)
})

let name = ''

const Coordinates = observer(() =>
  <div className='clearfix coordinates'>
    { [ 'lat', 'lng' ].map((direction, idx) =>
      <div key={ idx } className='pull-xs-left'>
        <div className='input-group'>
          <span className='input-group-addon' id='basic-addon1'>
            { direction }
          </span>
          <input
            type='text'
            className='form-control'
            placeholder={ direction }
            aria-describedby='basic-addon1'
            value={ userLocation[idx] }
            onChange={ handleChange(idx) } />
        </div>
      </div>
    ) }
    <input
      type='text'
      className='form-control'
      placeholder='name'
      className='pull-xs-left'
      onChange={({ target: { value }}) => name = value}
    />
    <button 
      className='btn btn-sm btn-default pull-xs-left'
      onClick={ () => locations.add(name, userLocation) }
    >
      Save
    </button>
  </div>
)

export default Coordinates
