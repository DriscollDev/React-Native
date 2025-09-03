import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import * as Battery from 'expo-battery';

const SHAKE_THRESHOLD = 1.2;
const CHARGE_INCREMENT = 5;

const getBatteryColor = (level: number) => {
  if (level < 0.2) return '#ff3b30'; // red
  if (level < 0.5) return '#ffd60a'; // yellow
  return '#34c759'; // green
};

const ShakeToChargeScreen: React.FC = () => {
  const [batteryLevel, setBatteryLevel] = useState<number>(0);
  const [fakeLevel, setFakeLevel] = useState<number>(0);
  const [isFullyCharged, setIsFullyCharged] = useState(false);
  // Removed shake animation

  useEffect(() => {
    Battery.getBatteryLevelAsync().then((level: number) => {
      setBatteryLevel(level);
      setFakeLevel(level);
    });
  }, []);

  useEffect(() => {
    let subscription: any;
    subscription = Accelerometer.addListener((event: { x: number; y: number; z: number }) => {
      const { x, y, z } = event;
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      if (magnitude > SHAKE_THRESHOLD && !isFullyCharged) {
        setFakeLevel(prev => {
          const next = Math.min(prev + CHARGE_INCREMENT / 100, 1);
          if (next >= 1) setIsFullyCharged(true);
          return next;
        });
      }
    });
    Accelerometer.setUpdateInterval(200);
    return () => subscription && subscription.remove();
  }, [isFullyCharged]);

  const percent = Math.round(fakeLevel * 100);
  const batteryColor = getBatteryColor(fakeLevel);

  const handleReset = (type: 'zero' | 'fifty' | 'actual') => {
    setIsFullyCharged(false);
    if (type === 'zero') setFakeLevel(0);
    else if (type === 'fifty') setFakeLevel(0.5);
    else setFakeLevel(batteryLevel);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shake to Charge</Text>
      <Text style={styles.percent}>{percent}%</Text>
      <View style={[styles.battery, { borderColor: batteryColor }]}> 
        <View style={styles.batteryTip} />
        <View style={styles.batteryBody}>
          <View style={[styles.batteryLevel, { width: `${percent}%`, backgroundColor: batteryColor }]} />
        </View>
      </View>
      {isFullyCharged && <Text style={styles.charged}>Device is fully charged!</Text>}
      <View style={styles.buttonRow}>
        <Text style={styles.resetLabel}>Reset charge:</Text>
        <View style={styles.buttonGroup}>
          <Text style={styles.button} onPress={() => handleReset('zero')}>0%</Text>
          <Text style={styles.button} onPress={() => handleReset('fifty')}>50%</Text>
          <Text style={styles.button} onPress={() => handleReset('actual')}>Actual</Text>
        </View>
      </View>
      <Text style={styles.instruction}>Shake your device to increase the battery level.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  percent: {
    fontSize: 24,
    marginBottom: 10,
  },
  battery: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  batteryTip: {
    width: 8,
    height: 32,
    backgroundColor: '#ccc',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  batteryBody: {
    width: 200,
    height: 32,
    borderWidth: 3,
    borderColor: '#ccc',
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#eee',
    position: 'relative',
  },
  batteryLevel: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 3,
  },
  charged: {
    fontSize: 20,
    color: '#34c759',
    fontWeight: 'bold',
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  resetLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#eee',
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 16,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 5,
    overflow: 'hidden',
  },
  instruction: {
    fontSize: 16,
    color: '#888',
    marginTop: 30,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default ShakeToChargeScreen;
