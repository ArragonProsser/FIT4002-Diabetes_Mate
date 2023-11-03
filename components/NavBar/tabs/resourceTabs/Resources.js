import React from 'react';

import { View, Text, FlatList, StyleSheet } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons'
import { ListItem } from '@rneui/themed';

export default function Resources() {

    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      listItem: {
        paddingTop: 10,
        paddingBottom: 10,
        textAlignVertical: 'center',
        textAlign: 'center',
      }
    });

    return (
        <View 
        style={{flex: 1}}
        >
        <FlatList style={styles.container}
        data={[
          {label: 'Understanding type 1 diabetes'},
          {label: 'Understanding type 2 diabetes'},
          {label: 'Understanding gestational diabetes'},
          {label: 'Understanding pre-diabetes'},
          {label: 'Blood Glucose Monitoring'},
        ]}
        renderItem={
          ({item}) => 
          <>
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title style={styles.listItem}>
                  {item.label}
                </ListItem.Title>
              </ListItem.Content>
              
              <IonIcons name="open-outline" size={20}/>
            </ListItem>
          </>
        }
        />
        </View>
    )
}