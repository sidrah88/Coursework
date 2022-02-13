import React, { Component } from 'react';
import { SectionList, StyleSheet, Text, View, Header } from 'react-native';

class ContactsScreen extends Component{
  render(){
    return(
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Contacts</Text>
            <Text style={styles.addContact}>+</Text>
          </View>
          <View style={styles.scroller}>
            <SectionList
              sections={[
                {title: 'A', data: ['Anne-Marie', 'Ash']}, {title: 'B', data: ['Ben']}, {title: 'C', data: ['Charlie', 'Chris']},
                {title: 'D', data: ['David', 'Dean']}, {title: 'E', data: ['Euan']}, {title: 'F', data: ['Freya']},
                {title: 'G', data: ['Gordon']}, {title: 'H', data: ['Hannah']}, {title: 'I', data: ['Isla']}, {title: 'J', data: ['Jake']},
                {title: 'K', data: ['Kate']}, {title: 'L', data: ['Lola']}, {title: 'M', data: ['Marie', 'Megan']},
              ]}
              renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
              renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
              keyExtractor={(item, index) => index}
              />
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flex:1,
    backgroundColor: 'powderblue',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerText:{
    fontSize: 22,
    fontWeight: 'bold',
    padding: 10,
  },
  addContact:{
    fontSize: 22,
    fontWeight: 'bold',
    padding: 10,
    paddingRight: 25,
  },
  scroller:{
    flex:7,
    backgroundColor: 'skyblue',
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'steelblue',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  }
})

export default ContactsScreen;
