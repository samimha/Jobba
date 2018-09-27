const locationReducerDefaultState = {
    userLocation: {
        lat: "jee",
        lng: "jihuu"
    }
}
//userLocation:{lat:"je"},lng:"ju"
export default (state = {}, action) => {
    switch (action.type) {
        case 'ADD_LOCATION':
            return {
                userLocation: action.location
            };
        default:
            return state;
    }
};
// export default function(){
//     return {
//         userLocation:{
//             lat: 60.17167094859696,
//             lng: 24.94027066898161
//         }
//     }
// }