import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Updates from "expo-updates";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const checkForUpdate = async () => {
      if (!__DEV__) {
        try {
          const update = await Updates.checkForUpdateAsync();
          if (update.isAvailable) {
            setModalVisible(true);
          }
        } catch (e) {
          console.error("Failed to check for update:", e);
        }
      }
    };
    const interval=setInterval(()=>{
      checkForUpdate();
    },1000)

    return()=>clearInterval(interval)
  }, []);

  const handleUpdate = async () => {
    try {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    } catch (e) {
      console.error("Failed to update:", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Hello Brothers!! Updated By TagLine </Text>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {
          setModalVisible(true);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Update Available</Text>
            <Text style={styles.modalMessage}>
              A new update is available. Would you like to apply it now?
            </Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.cancel]}
                onPress={() => {
                  setModalVisible(true);
                }}
              >
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
});
