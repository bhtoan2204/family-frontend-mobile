import { StyleSheet } from 'react-native';
import { COLORS } from 'src/constants';

const styles = StyleSheet.create({
    
    header: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingHorizontal: 16,
        paddingVertical: 10,
      },
      headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      headerSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      iconContainer: {
        marginRight: 20, 
      },
      calendarIcon: {
        marginLeft: 'auto', 
      },
      headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10, 
        textAlign: 'center',
      },
  calendar: {
    flex: 1,
    },

    headerp: {
        flexDirection: 'row',
        marginTop: 40,
        textAlign: 'center',
        alignItems: 'center'
    },

    icon: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',

    },


    subHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    dateTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    plusIcon: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#00adf5',
        borderRadius: 50,
        padding: 15,
        elevation: 5, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    agendaItem: {
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,

    },

    agendaItemText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    agendaItemTime: {
        fontSize: 14,
    },
    rightAction: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginVertical: 5,
        backgroundColor: 'lightgray',
        borderRadius: 5,
    },
    actionButton: {
        padding: 10,
        borderRadius: 5,
    },
    actionButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemContainer: {
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      itemContent: {
        flex: 1,
        marginLeft: 10,
      },
      itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
      },
      itemTime: {
        fontSize: 14,
        color: 'gray',
      },
      event: {
        borderRadius: 50,
        padding: 0,
      },
      headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: 'white',
      },
      buttonContainer: {
        padding: 8,
      },
      container: {
        flex: 1,
      },

});

export default styles;
