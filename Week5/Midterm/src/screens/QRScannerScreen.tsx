import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { CameraView, Camera, BarcodeScanningResult } from 'expo-camera';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScannerStackParamList } from '../navigation/ScannerStackNavigator';

// Type definition for navigation prop
type QRScannerNavigationProp = StackNavigationProp<ScannerStackParamList, 'QRScanner'>;

// QR Scanner screen component - handles camera permissions and QR code scanning
export default function QRScannerScreen() {
  const navigation = useNavigation<QRScannerNavigationProp>();
  
  // State variables for camera and scanning functionality
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [qrDetected, setQrDetected] = useState(false);
  const [detectedUrl, setDetectedUrl] = useState<string>('');

  // Request camera permissions on component mount
  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getCameraPermissions();
  }, []);

  // Reset scanner state when screen comes back into focus
  useFocusEffect(
    useCallback(() => {
      resetScanner();
    }, [])
  );

  // Handle successful QR code detection
  const handleBarCodeScanned = ({ type, data }: BarcodeScanningResult) => {
    if (!qrDetected) {
      setQrDetected(true);
      setDetectedUrl(data);
    }
  };

  // Process confirmed QR scan and navigate to appropriate screen
  const handleConfirmScan = () => {
    setScanned(true);
    setQrDetected(false);
    
    // Check if the scanned URL contains product information
    if (detectedUrl.includes('/products/')) {
      // Navigate to ProductDetail screen with the scanned URL
      navigation.navigate('ProductDetail', { url: detectedUrl });
    } else {
      // Show error for non-product QR codes and reset scanner
      Alert.alert(
        'Not a Product QR Code',
        'This QR code does not contain a product URL. Please scan a product QR code.',
        [
          {
            text: 'OK',
            onPress: () => resetScanner(),
          },
        ]
      );
    }
  };

  // Reset all scanner states to initial values
  const resetScanner = () => {
    setScanned(false);
    setQrDetected(false);
    setDetectedUrl('');
  };

  // Handle camera permission states
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>QR Scanner</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>Scan Product QR Code</Text>
        <Text style={styles.subtitle}>Point your camera at a product QR code</Text>
        
        <View style={styles.cameraContainer}>
          <CameraView
            style={styles.camera}
            facing="back"
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ['qr'], // Only scan QR codes
            }}
          />
          
          {/* Scanning overlay with corner indicators */}
          <View style={styles.overlay}>
            <View style={styles.scanArea}>
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
            </View>
          </View>
          
          {/* QR Code confirmation dialog - shown when QR is detected */}
          {qrDetected && !scanned && (
            <View style={styles.confirmContainer}>
              <Text style={styles.detectedText}>QR Code Detected!</Text>
              <Text style={styles.urlPreview} numberOfLines={2}>
                {detectedUrl}
              </Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={handleConfirmScan}
                >
                  <Text style={styles.confirmButtonText}>Scan</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={resetScanner}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        
        {/* Bottom instructions text */}
        <Text style={styles.instructions}>
          Point your camera at a product QR code, then tap "Scan" to view product details
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#2196F3',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  cameraContainer: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 250,
    height: 250,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#2196F3',
    borderWidth: 4,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
  confirmContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  detectedText: {
    color: '#4CAF50',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  urlPreview: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 10,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    flex: 1,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  homeButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    flex: 1,
  },
  homeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
    minWidth: 80,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  postScanContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    gap: 10,
  },
  scanAgainButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
  },
  scanAgainText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  homeButtonSecondary: {
    backgroundColor: 'rgba(33, 150, 243, 0.9)',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
  },
  homeButtonSecondaryText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  instructions: {
    fontSize: 14,
    textAlign: 'center',
    color: '#888',
    fontStyle: 'italic',
  },
});
