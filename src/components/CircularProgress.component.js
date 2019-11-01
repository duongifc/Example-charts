import React from 'react';
import {Text, View} from 'react-native';

import styles, {rotateByStyle} from './CircularProgress.component.styles';
import CONSTANTS from './CircularProgress.constants';

const renderThirdLayer = (
  percent,
  commonStyles,
  ringColorStyle,
  ringBgColorStyle,
  clockwise,
  bgRingWidth,
  progressRingWidth,
  innerRingStyle,
  startDegrees,
) => {
  let rotation = CONSTANTS.ROTATE_DEGREE + startDegrees;
  let offsetLayerRotation = CONSTANTS.INITIAL_ROTATION_DEGREE + startDegrees;
  if (!clockwise) {
    rotation += CONSTANTS.HALF_CIRCLE_DEGREE;
    offsetLayerRotation += CONSTANTS.HALF_CIRCLE_DEGREE;
  }
  if (percent > CONSTANTS.HALF_SEMICIRCLE_LIMIT_DEGREE) {
    /**
     * Third layer circles default rotation is kept 45 degrees for clockwise rotation, so by default it occupies the right half semicircle.
     * Since first 50 percent is already taken care  by second layer circle, hence we subtract it
     * before passing to the rotateByStyle function
     **/

    return (
      <View
        style={[
          styles.secondProgressLayer,
          rotateByStyle(
            percent - CONSTANTS.HALF_SEMICIRCLE_LIMIT_DEGREE,
            rotation,
            clockwise,
          ),
          commonStyles,
          ringColorStyle,
          {borderWidth: progressRingWidth},
        ]}
      />
    );
  } else {
    return (
      <View
        style={[
          styles.offsetLayer,
          innerRingStyle,
          ringBgColorStyle,
          {
            transform: [{rotateZ: `${offsetLayerRotation}deg`}],
            borderWidth: bgRingWidth,
          },
        ]}
      />
    );
  }
};

const CircularProgress = ({
  percent,
  radius,
  bgRingWidth,
  progressRingWidth,
  ringColor,
  ringBorderColor,
  ringBackgroundColor,
  textFontSize,
  textFontWeight,
  clockwise,
  bgColor,
  startDegrees,

  score,
  total,
}) => {
  const commonStyles = {
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
  };

  /**
   * Calculate radius for base layer and offset layer.
   * If progressRingWidth == bgRingWidth, innerRadius is equal to radius
   **/
  const widthDiff = progressRingWidth - bgRingWidth;
  const innerRadius = radius - progressRingWidth + bgRingWidth + widthDiff / 2;

  const innerRingStyle = {
    width: innerRadius * 2,
    height: innerRadius * 2,
    borderRadius: innerRadius,
  };

  const ringColorStyle = {
    borderRightColor: ringColor,
    borderTopColor: ringColor,
  };

  const ringBgColorStyle = {
    borderRightColor: ringBorderColor,
    borderTopColor: ringBorderColor,
  };

  const thickOffsetRingStyle = {
    borderRightColor: bgColor,
    borderTopColor: bgColor,
  };

  let rotation = CONSTANTS.INITIAL_ROTATION_DEGREE + startDegrees;
  /**
   * If we want our ring progress to be displayed in anti-clockwise direction
   **/
  if (!clockwise) {
    rotation += CONSTANTS.HALF_CIRCLE_DEGREE;
  }
  let firstProgressLayerStyle;
  /* when ther ring's border widths are different and percent is less than 50, then we need an offsetLayer
   * before the original offser layer to avoid ring color of the thick portion to be visible in the background.
   */
  let displayThickOffsetLayer = false;
  if (percent > CONSTANTS.HALF_SEMICIRCLE_LIMIT_DEGREE) {
    firstProgressLayerStyle = rotateByStyle(
      CONSTANTS.HALF_SEMICIRCLE_LIMIT_DEGREE,
      rotation,
      clockwise,
    );
  } else {
    firstProgressLayerStyle = rotateByStyle(percent, rotation, clockwise);
    if (progressRingWidth > bgRingWidth) {
      displayThickOffsetLayer = true;
    }
  }

  let offsetLayerRotation = CONSTANTS.INITIAL_ROTATION_DEGREE + startDegrees;
  if (!clockwise) {
    offsetLayerRotation += CONSTANTS.HALF_CIRCLE_DEGREE;
  }

  return (
    <View style={[styles.container, {width: radius * 2, height: radius * 2}]}>
      <View
        style={[
          styles.baseLayer,
          innerRingStyle,
          {
            borderColor: ringBorderColor,
            borderWidth: bgRingWidth,
            backgroundColor: ringBackgroundColor,
          },
        ]}
      />
      <View
        style={[
          styles.firstProgressLayer,
          firstProgressLayerStyle,
          commonStyles,
          ringColorStyle,
          {borderWidth: progressRingWidth},
        ]}
      />
      {displayThickOffsetLayer && (
        <View
          style={[
            styles.offsetLayer,
            commonStyles,
            thickOffsetRingStyle,
            {
              transform: [{rotateZ: `${offsetLayerRotation}deg`}],
              borderWidth: progressRingWidth,
            },
          ]}
        />
      )}
      {renderThirdLayer(
        percent,
        commonStyles,
        ringColorStyle,
        ringBgColorStyle,
        clockwise,
        bgRingWidth,
        progressRingWidth,
        innerRingStyle,
        startDegrees,
      )}
      <View style={[styles.display, styles.container]}>
        <Text style={styles.text}>Current Score</Text>
        <Text
          style={[
            styles.text,
            {fontSize: textFontSize, fontWeight: textFontWeight},
          ]}>
          {score}
        </Text>
        <Text style={styles.text}>out of {total}</Text>
        <Text style={[styles.text, styles.statusText]}>You're doing great</Text>
      </View>
    </View>
  );
};

// default values for props
CircularProgress.defaultProps = {
  percent: 0,
  radius: 150,
  bgRingWidth: 5,
  progressRingWidth: 10,
  ringColor: '#3498db',
  ringBorderColor: 'transparent',
  ringBackgroundColor: 'rgba(52, 52, 52, 0.8)',
  textFontSize: 100,
  textFontWeight: 'bold',
  clockwise: true,
  bgColor: 'blue',
  startDegrees: 0,
};

export default CircularProgress;
