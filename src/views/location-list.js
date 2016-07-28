import React, { Component } from 'react'
import { action } from 'mobx'
import { observer } from 'mobx-react'

import userLocation from '../models/user-location'
import locations from '../models/locations'
import autopilot from '../models/autopilot'

@observer
class LocationList extends Component {
  @action onGo(i) {
    const [lat, lng] = locations.locations[i].latlng
    autopilot.scheduleTrip(lat, lng).then(() => {
      autopilot.speed = '~' // teleport
      autopilot.steps = JSON.parse(JSON.stringify(autopilot.accurateSteps))
      autopilot.start()
    })
  }

  @action onRemove(i) {
    locations.remove(i)
  }

  render() {
    return (
      <div className='col-xs-3'>
        <h5 className='text-center'>Locations saved</h5>
        <div className='btn-group'>
          <button className='btn btn-primary' onClick={() => locations.export()}>
            Export
          </button>
          <button className='btn btn-primary' onClick={() => locations.import()}>
            Import
          </button>
        </div>
        <ul className='list-group'>
        { 
          locations.locations.map((l, i) => 
            <li className='list-group-item row' key={i}>
              <h5>{l.name}</h5>
              <span className='pull-left'>{l.latlng.join(', ')}</span>
              <div className='btn-group pull-right' role='group'>
                <button 
                  disabled={ userLocation[0] == l.latlng[0] && userLocation[1] == l.latlng[1] }
                  className='btn btn-sm btn-success' 
                  onClick={() => this.onGo(i)}
                >
                  Teleport
                </button>
                <button 
                  className='btn btn-sm btn-danger' 
                  onClick={() => this.onRemove(i)}
                >
                  Remove
                </button>
              </div>
            </li>
          )
        }
        </ul>
      </div>
    )
  }
}

export default LocationList