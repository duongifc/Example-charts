import React from 'react';
import {StatusBar, View, ImageBackground, Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Text, Circle, G, TSpan, Line} from 'react-native-svg';
import CircularProgress from './src/components/CircularProgress.component';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.chartRef = React.createRef();
  }

  componentDidMount(): void {
    if (this.chartRef.current) {
      this.forceUpdate();
    }
  }

  render() {
    const screenWidth = Dimensions.get('window').width;
    const chartData = {
      labels: ['Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct'],
      datasets: [
        {
          data: [20, 45, 28, 80, 99, 43, 50, 0, 10],
          color: (opacity = 1) => `rgba(255, 255, 0, ${opacity})`, // optional
          strokeWidth: 3, // optional
        },
      ],
    };
    const chartConfig = {
      backgroundGradientFrom: 'black',
      backgroundGradientFromOpacity: 0.8,
      backgroundGradientTo: 'white',
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 0.2) => `rgba(255, 255, 0, ${opacity})`,
      barPercentage: 0.5,

      propsForDots: {
        r: '5',
        strokeWidth: '2',
        stroke: '#ffa726',
        fill: 'black',
      },
    };
    const selectedPointIndex = 3;

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ImageBackground
            source={require('./src/assets/images/bg.jpg')}
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CircularProgress
              percent={parseInt((688 / 999) * 100)}
              score={688}
              total={999}
            />
            <LineChart
              ref={this.chartRef}
              data={chartData}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              withInnerLines={false}
              withOuterLines={false}
              withHorizontalLabels={false}
              withVerticalLabels={false}
              style={{
                paddingLeft: 25,
                paddingRight: 30,
                paddingTop: 25,
              }}
              decorator={({width, height, data, paddingTop, paddingRight}) => {
                if (this.chartRef.current) {
                  let points = [];
                  let selectedPoints;
                  data.forEach((dataset, index) => {
                    dataset.data.forEach((d, i) => {
                      const x =
                        (i * (width - paddingRight)) / dataset.data.length +
                        paddingRight;
                      const y =
                        ((height -
                          this.chartRef.current.calcHeight(
                            d,
                            this.chartRef.current.getDatas(data),
                            height,
                          )) /
                          4) *
                          3 +
                        paddingTop;
                      points.push({x, y});

                      if (selectedPointIndex === i) {
                        selectedPoints = {x, y};
                      }
                    });
                  });

                  return (
                    <G>
                      {points.map(point => (
                        <G>
                          <Text
                            fill="white"
                            fontSize="10"
                            x={point.x}
                            y={15}
                            textAnchor="middle">
                            <TSpan>
                              {chartData.labels[points.indexOf(point)]}
                            </TSpan>
                          </Text>
                          <Line
                            x1={point.x}
                            y1={20}
                            x2={point.x}
                            y2={point.y - 6} // draw line from top to dot = positionY - dot's size + border width
                            stroke="rgba(255, 255, 255, 0.3)"
                            strokeWidth={0.5}
                          />
                          <Line
                            x1={point.x}
                            y1={point.y + 6}
                            x2={point.x}
                            y2={height} // draw line from dot to bottom = positionY - dot's size + border width
                            stroke="rgba(255, 255, 255, 0.3)"
                            strokeWidth={0.5}
                          />
                        </G>
                      ))}

                      {selectedPoints && (
                        <G key={`${selectedPoints.x},${selectedPoints.y}`}>
                          <Circle
                            cx={selectedPoints.x}
                            cy={selectedPoints.y}
                            r={5}
                            fill={'rgba(255, 255, 0, 1)'}
                          />
                          <Circle
                            cx={selectedPoints.x}
                            cy={selectedPoints.y}
                            r={12}
                            fill={'rgba(255, 255, 0, 0.8)'}
                          />
                          <Circle
                            cx={selectedPoints.x}
                            cy={selectedPoints.y}
                            r={25}
                            fill={'rgba(255, 255, 0, 0.2)'}
                          />
                        </G>
                      )}
                    </G>
                  );
                }
              }}
            />
          </ImageBackground>
        </View>
      </>
    );
  }
}

export default App;
