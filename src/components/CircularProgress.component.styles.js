import {StyleSheet} from 'react-native';

/**
 * offsetLayer has transform:[{rotateZ: '-135deg'}] since
 * the offsetLayer rotation is fixed by us.
 **/
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  baseLayer: {
    position: 'absolute',
  },
  firstProgressLayer: {
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  secondProgressLayer: {
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  offsetLayer: {
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  display: {
    position: 'absolute',
  },
  text: {
    color: 'white',
    fontSize: 14,
  },
  statusText: {
    marginTop: 15,
    color: 'green',
    fontSize: 16,
  },
});

/**
 * Function that calculates rotation of the semicircle for firstProgressLayer
 * ( when percent is less than equal to 50 ) or for the secondProgressLayer
 * when percent is greater than 50.
 **/
const rotateByStyle = (percent, baseDegrees, clockwise) => {
  let rotateBy = baseDegrees;
  if (clockwise) {
    rotateBy = baseDegrees + percent * 3.6;
  } else {
    //anti clockwise progress
    rotateBy = baseDegrees - percent * 3.6;
  }
  return {
    transform: [{rotateZ: `${rotateBy}deg`}],
  };
};

export default styles;
export {rotateByStyle};
