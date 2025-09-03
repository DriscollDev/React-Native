import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Accelerometer } from "expo-sensors";
import * as Battery from "expo-battery";

export default function App() {
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [batterySubscription, setBatterySubscription] = useState<null | { remove: () => void }>(null);

  const _subscribeBattery = async () => {
    const batteryLevel = await Battery.getBatteryLevelAsync();
    setBatteryLevel(batteryLevel);

    setBatterySubscription(
      Battery.addBatteryLevelListener(({ batteryLevel }) => {
        setBatteryLevel(batteryLevel);
        console.log('batteryLevel changed!', batteryLevel);
      })
    );
  };

  const _unsubscribeBattery = () => {
    batterySubscription && batterySubscription.remove();
    setBatterySubscription(null);
  };

  useEffect(() => {
    _subscribeBattery();
    return () => _unsubscribeBattery();
  }, []);

  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [accelSubscription, setAccelSubscription] = useState<null | ReturnType<
    typeof Accelerometer.addListener
  >>(null);

  const _slow = () => Accelerometer.setUpdateInterval(1000);
  const _fast = () => Accelerometer.setUpdateInterval(16);

  const _subscribeAccel = () => {
    setAccelSubscription(Accelerometer.addListener(setData));
  };

  const _unsubscribeAccel = () => {
    accelSubscription && accelSubscription.remove();
    setAccelSubscription(null);
  };

  useEffect(() => {
    _subscribeAccel();
    return () => _unsubscribeAccel();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text>Current Battery Level: {batteryLevel}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>
          Accelerometer: (in gs where 1g = 9.81 m/s^2)
        </Text>
        <Text style={styles.text}>x: {x}</Text>
        <Text style={styles.text}>y: {y}</Text>
        <Text style={styles.text}>z: {z}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={accelSubscription ? _unsubscribeAccel : _subscribeAccel}
            style={styles.button}
          >
            <Text>{accelSubscription ? "On" : "Off"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={_slow}
            style={[styles.button, styles.middleButton]}
          >
            <Text>Slow</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_fast} style={styles.button}>
            <Text>Fast</Text>
          </TouchableOpacity>
        </View>
      </View>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: 15,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: "#ecf0f1",
  },
  text: {
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
});
