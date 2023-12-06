import * as React from 'react'
import { View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

function Times (props) {
  return (
    <View>
      <Svg
        width={12}
        height={12}
        viewBox='0 0 12 12'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        {...props}
      >
        <Path
          d='M7.273 6l3.846-3.846.793-.793a.3.3 0 000-.424l-.848-.849a.3.3 0 00-.425 0L6 4.728 1.36.087a.3.3 0 00-.423 0l-.85.848a.3.3 0 000 .425L4.728 6l-4.64 4.638a.3.3 0 000 .425l.85.848a.3.3 0 00.424 0L6 7.273l3.845 3.846.793.793a.3.3 0 00.425 0l.848-.848a.3.3 0 000-.425L7.273 6z'
          fill={props.color || '#222'}
        />
      </Svg>
    </View>
  )
}

export default Times
