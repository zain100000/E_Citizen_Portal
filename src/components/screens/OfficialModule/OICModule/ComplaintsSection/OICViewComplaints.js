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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const OICViewComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [expandedComplaintId, setExpandedComplaintId] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      const databaseRef = database().ref('Complaints');

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
      const databaseRef = database().ref('Complaints');
      databaseRef.off('value');
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

  const handleApprove = async complaintId => {
    // Find the complaint by ID in the complaints array
    const approvedComplaint = complaints.find(
      complaint => complaint.id === complaintId,
    );

    if (approvedComplaint) {
      // Create a reference to the "ApproveComplaint" database collection
      const approveComplaintRef = database().ref('ApproveComplaints');

      // Push the approved complaint to the "ApproveComplaint" collection
      approveComplaintRef.push(approvedComplaint);
    }
  };

  const handleReject = async complaintId => {
    // Find the complaint by ID in the complaints array
    const rejectedComplaint = complaints.find(
      complaint => complaint.id === complaintId,
    );

    if (rejectedComplaint) {
      // Create a reference to the "RejectComplaint" database collection
      const rejectComplaintRef = database().ref('RejectComplaints');

      // Push the rejected complaint to the "RejectComplaint" collection
      rejectComplaintRef.push(rejectedComplaint);
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
        <TouchableOpacity onPress={() => handleApprove(item.id)}>
          <MaterialCommunityIcons
            name="check"
            size={30}
            color="green"
            style={{marginHorizontal: 10}}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleReject(item.id)}>
          <MaterialCommunityIcons
            name="close"
            size={30}
            color="red"
            style={{marginHorizontal: 10}}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {complaints.length === 0 ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
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
});

export default OICViewComplaints;
