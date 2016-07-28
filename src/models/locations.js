import { observable, action } from 'mobx'
import Alert from 'react-s-alert'

// electron specific
const { dialog } = window.require('electron').remote
const fs = window.require('fs')

class Locations {
  @observable locations = []
  
  @action clear() {
    this.locations = []
  }

  @action add(name, locationArray) {
    this.locations.push({
      name,
      latlng: locationArray.slice()
    })
  }

  @action remove(idx) {
    this.locations.splice(idx, 1)
  }

  @action export() {
    const content = JSON.stringify(this.locations, 4)

    dialog.showSaveDialog({
      defaultPath: '~/Desktop/pkg_locations.json',
    }, (filename) => {
      if (filename === undefined) return

      fs.writeFile(filename, content, (err) => {
        if (err) return Alert.error('export file error ' + err)
        
        Alert.success('export file success')
      })
    })
  }

  @action import() {
    dialog.showOpenDialog({
      defaultPath: '~/Desktop/pkg_locations.json',
      properties: ['openFile'],
      filters: [{name: 'JSON file', extensions: ['json']}]
    }, (filename) => {
      if (filename === undefined) return

      fs.readFile(filename[0], 'utf-8', (err, data) => {
        if (err) return Alert.error('import file error ' + err)

        this.locations = JSON.parse(data)
        Alert.success('import file success')
      })
    })
  }
}

export default new Locations()