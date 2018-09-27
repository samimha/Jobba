export const addLocation = (location) => {
    console.log(location);
    return {
        type: 'ADD_LOCATION',
        location
    }

};
// export const startAddLocation = (location = {}) => {
//     return (dispatch) => {
//         const loc = {
//             lat: location.lat,
//             lgn: location.lng
//         }
//         dispatch(addLocation(loc));
//     }
// }