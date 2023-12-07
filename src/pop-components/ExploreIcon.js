import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function ExploreIcon (props) {
  return (
    <Svg
      width={25}
      height={24}
      viewBox='0 0 25 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <Path
        d='M3.792 3.374c-3.76 3.761-3.804 9.817-.098 13.524 3.069 3.068 7.742 3.564 11.396 1.512l9.134 5.396-5.396-9.134c2.052-3.654 1.556-8.327-1.512-11.396C13.609-.43 7.553-.386 3.792 3.375zM15.05 14.6l-.016.017c-2.705 2.704-7.167 2.56-9.595-.46-1.855-2.309-1.839-5.683.033-8.027.166-.207.337-.4.521-.58.53-.528 1.43-.09 1.344.65a6.357 6.357 0 001.813 5.25 6.351 6.351 0 005.253 1.812c.738-.087 1.179.81.652 1.342l-.005-.004z'
        fill={props.color || '#BFE4F9'}
      />
    </Svg>
  )
}

export default ExploreIcon
