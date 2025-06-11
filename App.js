import React, { useEffect, useState, useRef } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import * as Updates from "expo-updates";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const hasCheckedUpdate = useRef(false); 

  useEffect(() => {
    const checkForUpdate = async () => {
      if (!__DEV__ && !hasCheckedUpdate.current) {
        try {
          const update = await Updates.checkForUpdateAsync();
          if (update.isAvailable) {
            setModalVisible(true);
            hasCheckedUpdate.current = true;
          }
        } catch (e) {
          console.error("Failed to check for update:", e);
        }
      }
    };

    const interval = setInterval(() => {
      checkForUpdate();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      setModalVisible(false); // hide modal while updating
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    } catch (e) {
      console.error("Failed to update:", e);
      setLoading(false); // stop loader on error
    }
  };

  return (
    <View style={styles.container}>
      <Text>Hello Brothers!! Updated By TagLine Developers</Text>

      {/* Loader Modal */}
      <Modal visible={loading} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#2196F3" />
            <Text style={{ marginTop: 10 }}>Updating...</Text>
          </View>
        </View>
      </Modal>

      {/* Update Prompt Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Update Available</Text>
            <Text style={styles.modalMessage}>
              A new update is available. Would you like to apply it now?
            </Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.cancel]}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.update]}
                onPress={handleUpdate}
              >
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    marginLeft: 10,
  },
  cancel: {
    backgroundColor: "#ccc",
  },
  update: {
    backgroundColor: "#2196F3",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loaderContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
});
