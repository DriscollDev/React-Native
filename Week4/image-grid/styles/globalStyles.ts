// styles/globalStyles.ts
import { StyleSheet } from 'react-native';

// Define color constants
export const Colors = {
  primary: '#61dafb',
  secondary: '#20232a',
  background: '#eaeaea',
  white: '#ffffff',
  black: '#000000',
  gray: '#666666',
  lightGray: '#f0f0f0',
};

// Define common spacing
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

// Define font sizes
export const FontSizes = {
  small: 12,
  medium: 16,
  large: 20,
  xlarge: 24,
  xxlarge: 30,
};

// Global styles that can be shared across components
export const globalStyles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    padding: Spacing.lg,
    backgroundColor: Colors.background,
  },
  
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // Text styles
  title: {
    marginTop: Spacing.md,
    paddingVertical: Spacing.sm,
    borderWidth: 4,
    borderColor: Colors.secondary,
    borderRadius: 6,
    backgroundColor: Colors.primary,
    color: Colors.secondary,
    textAlign: 'center',
    fontSize: FontSizes.xxlarge,
    fontWeight: 'bold',
  },

  text: {
    fontSize: FontSizes.medium,
    color: Colors.secondary,
  },

  // Card styles
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    marginVertical: Spacing.sm,
    backgroundColor: Colors.white,
    borderRadius: 8,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // Image styles
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: Spacing.md,
  },

  // Search styles
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.md,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  searchIcon: {
    marginRight: Spacing.sm,
    color: Colors.gray,
  },

  searchInput: {
    flex: 1,
    fontSize: FontSizes.medium,
    color: Colors.secondary,
  },

  // List styles
  list: {
    flex: 1,
  },

  // Grid styles
  gridContainer: {
    flex: 1,
    padding: Spacing.sm,
  },

  gridRow: {
    justifyContent: 'space-between',
  },

  gridItem: {
    flex: 1,
    marginHorizontal: Spacing.xs,
    marginVertical: Spacing.xs,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  gridImage: {
    width: '100%',
    aspectRatio: 1,
  },

  // Detail screen styles
  detailContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },

  detailImageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: Spacing.lg,
  },

  detailImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalImageContainer: {
    width: '90%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalImage: {
    width: '100%',
    height: '100%',
  },

  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default globalStyles;
