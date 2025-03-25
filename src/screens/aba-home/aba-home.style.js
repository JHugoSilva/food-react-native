import { COLORS, FONT_SIZE } from "../../constants/theme";

export const styles = {
    container:{ 
        flex:1,
        padding:12,
        backgroundColor:COLORS.white
    },
    logo:{
        width:140,
        height:27
    },
    cart:{
        width:30,
        height:30
    },
    headerBar:{
        height:45,
        flexDirection:'row',
        justifyContent:"space-between",
        marginTop:5
    },
    busca:{
        marginBottom:10
    },
    destaques:{
        color:COLORS.dark_gray,
        fontWeight:'bold',
        marginTop:10
    },
    cartQtd:{
        position:'absolute',
        top:-5,
        right:0,
        fontSize:FONT_SIZE.xsm,
        backgroundColor: COLORS.red,
        padding:2,
        paddingLeft:4,
        paddingRight:4,
        color:COLORS.white,
        borderRadius:3
    }
}