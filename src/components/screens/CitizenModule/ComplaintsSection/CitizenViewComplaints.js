import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  LayoutAnimation,
  Image,
} from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CitizenViewComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [expandedComplaintId, setExpandedComplaintId] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      const user = auth().currentUser;
      if (!user) {
        // Handle case when user is not signed in
        alert('User is not Authentic');
        return;
      }

      const databaseRef = database()
        .ref('Complaints')
        .orderByChild('userId')
        .equalTo(user.uid);

      databaseRef.on('value', snapshot => {
        const data = snapshot.val();
        if (data) {
          const complaintsArray = Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value,
          }));
          complaintsArray.sort((a, b) => a.timestamp - b.timestamp);
          setComplaints(complaintsArray);
        } else {
          setComplaints([]);
        }
      });
    };

    fetchComplaints();

    return () => {
      const user = auth().currentUser;
      if (user) {
        const databaseRef = database()
          .ref('Complaints')
          .orderByChild('userId')
          .equalTo(user.uid);
        databaseRef.off('value');
      }
    };
  }, []);

  const toggleExpand = complaintId => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (expandedComplaintId === complaintId) {
      setExpandedComplaintId(null);
    } else {
      setExpandedComplaintId(complaintId);
    }
  };

  const isComplaintExpanded = complaintId => {
    return expandedComplaintId === complaintId;
  };

  const handleDelete = complaintId => {
    const user = auth().currentUser;
    if (user) {
      database()
        .ref('Complaints')
        .child(complaintId)
        .remove()
        .then(() => {
          setComplaints(prevComplaints =>
            prevComplaints.filter(c => c.id !== complaintId),
          );
        })
        .catch(error => {
          console.error('Error deleting complaint: ', error);
        });
    }
  };

  const renderItem = ({item}) => {
    const timestamp = new Date(item.timestamp);
    const formattedTimestamp = timestamp.toLocaleString();

    return (
      <TouchableOpacity
        onPress={() => toggleExpand(item.id)}
        style={styles.card}>
        <View className="flex-1 p-2">
          <Text className="text-[18px] font-bold text-black mb-3">Report</Text>
          <Text className="text-[18px] font-bold text-black mb-3">
            Subject: {item.subject}
          </Text>
          {isComplaintExpanded(item.id) && (
            <>
              <Text className="text-[18px] font-bold text-black mb-3">
                Category: {item.category}
              </Text>
              <Text className="text-[18px] font-bold text-black mb-3">
                Details: {item.details}
              </Text>
              <Text className="text-[18px] font-bold text-black mb-3">
                Address: {item.address}
              </Text>
              <Text className="text-[18px] font-bold text-black mb-3">
                Province: {item.province}
              </Text>
              <Text className="text-[18px] font-bold text-black mb-3">
                District: {item.district}
              </Text>
              <Text className="text-[18px] font-bold text-black mb-3">
                Tehsil: {item.tehsil}
              </Text>
              <Text className="text-[18px] font-bold text-black mb-3">
                TimeStamp: {formattedTimestamp}
              </Text>
              <FlatList
                data={item.files}
                keyExtractor={file => file.name}
                className="flex-1 flex-row"
                renderItem={({item: file}) => (
                  <View className="flex-1">
                    <View key={file.name}>
                      {file.name.endsWith('.mp4') ? (
                        <Video
                          source={{uri: file.downloadUrl}}
                          className="w-40 h-40 bg-contain left-2"
                        />
                      ) : (
                        <Image
                          source={{uri: file.downloadUrl}}
                          className="w-32 h-32 bg-contain left-2"
                        />
                      )}
                    </View>
                  </View>
                )}
              />
            </>
          )}
        </View>
        <TouchableOpacity
          onPress={() => handleDelete(item.id)}
          style={styles.deleteIcon}>
          <MaterialCommunityIcons name="delete" size={25} color="red" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1">
      {complaints.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-[20px] font-bold text-black">
            No Complaints Yet!
          </Text>
        </View>
      ) : (
        <FlatList
          data={complaints}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    overflow: 'hidden',
  },
  deleteIcon: {
    padding: 10,
  },
});

export default CitizenViewComplaints;
