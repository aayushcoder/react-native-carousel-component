import React, { Component } from 'react';
import { Text, StatusBar, StyleSheet, Navigator, TouchableOpacity } from 'react-native';
import CarouselComponent, { CarouselManager, CarouselCard } from 'react-native-carousel-component';
import MainPage from './MainPage';
import CarouselPage from './CarouselPage';
import Button from './components/Button';

const styles = StyleSheet.create({
  navigationBar: {
    borderBottomColor: '#b5b5b5',
    borderBottomWidth: 0.5,
    backgroundColor: '#ffffff',
  },
  navigationTitle: {
    padding: 10,
  },
  navigationButton: {
    padding: 10,
  },
  navigationLeftButton: {
    paddingLeft: 20,
    paddingRight: 40,
  },
  navigator: {
    flex: 1,
    backgroundColor: '#000000',
  },
});

export default class CarouselDemo extends Component {

  showCarousel = () => {
    this.carousel.show();
  }

  dismissCarousel = () => {
    this.carousel.dismiss();
  }

  showCarouselManager = () => {
    const options = {
      title: 'Title',
      cards: this.cards2,
      leftItem: {
        title: 'CLOSE',
        layout: 'title',
        onPress: this.dismissCarouselManager,
      },
    };

    CarouselManager.show(options, () => {
      console.log('CarouselManager - show callback');
    });
  }

  dismissCarouselManager = () => {
    CarouselManager.dismiss(() => {
      console.log('CarouselManager - dismiss callback');
    });
  }

  configureScene() {
    return Navigator.SceneConfigs.FloatFromRight;
  }

  renderScene = (route, navigator) => {
    if (route.name === 'carouselPage') {
      return <CarouselPage navigator={navigator} />;
    }

    return (
      <MainPage
        navigator={navigator}
        showCarousel={this.showCarousel}
        showCarouselManager={this.showCarouselManager}
      />
    );
  }

  get cards1() {
    const cards = [];
    for (let i = 0; i < 4; i += 1) {
      cards.push(
        <CarouselCard
          key={i}
          title="React Native"
          description="A React Native App is a Real Mobile App With React Native, you don't build a “mobile web app”, an “HTML5 app”, or a “hybrid app”. You build a real mobile app that's indistinguishable from an app built using Objective-C or Java. React Native uses the same fundamental UI building blocks as regular iOS and Android apps. You just put those building blocks together using JavaScript and React."
          actions={[
            <Button
              key={0}
              text="Dismiss"
              onPress={() => {
                this.dismissCarousel();
              }}
            />,
          ]}
        >
          <StatusBar barStyle="light-content" />
        </CarouselCard>,
      );
    }

    return cards;
  }

  get cards2() {
    const cards = [];
    for (let i = 0; i < 4; i += 1) {
      cards.push(
        <CarouselCard
          key={i}
          title="React Native"
          description="A React Native App is a Real Mobile App With React Native, you don't build a “mobile web app”, an “HTML5 app”, or a “hybrid app”. You build a real mobile app that's indistinguishable from an app built using Objective-C or Java. React Native uses the same fundamental UI building blocks as regular iOS and Android apps. You just put those building blocks together using JavaScript and React."
          actions={[
            <Button
              key={0}
              text="Dismiss"
              onPress={() => {
                this.dismissCarouselManager();
              }}
            />,
          ]}
        >
          <StatusBar barStyle="light-content" />
        </CarouselCard>,
      );
    }

    return cards;
  }

  get navigationBar() {
    return (
      <Navigator.NavigationBar
        style={styles.navigationBar}
        routeMapper={{
          LeftButton: (route, navigator, index) => {
            if (index === 0) return null;
            return (
              <TouchableOpacity
                style={[styles.navigationButton, styles.navigationLeftButton]}
                onPress={() => navigator.pop()}
              >
                <Text>
                  Back
                </Text>
              </TouchableOpacity>
            );
          },
          RightButton: () => null,
          Title: route => (
            <Text style={styles.navigationTitle}>
              {route.title}
            </Text>
          ),
        }}
      />
    );
  }

  render() {
    return (
      <CarouselComponent
        ref={(carousel) => { this.carousel = carousel; }}
        title="Title"
        cards={this.cards1}
        onShow={() => {
          console.log('show');
        }}
        onDismiss={() => {
          console.log('dismiss');
        }}
        leftItem={{
          title: 'CLOSE',
          layout: 'title',
          onPress: this.dismissCarousel,
        }}
      >
        <Navigator
          ref={(navigator) => { this.navigator = navigator; }}
          navigationBar={this.navigationBar}
          initialRoute={{ title: 'Main Page', name: 'mainPage' }}
          configureScene={this.configureScene}
          renderScene={this.renderScene}
          style={styles.navigator}
        />
      </CarouselComponent>
    );
  }
}
