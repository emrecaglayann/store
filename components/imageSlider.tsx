import { View, FlatList ,Text , StyleSheet, Image, Dimensions, ViewToken } from 'react-native'
import React, { useRef, useState } from 'react'
import Pagination from "./Pagination";




type Props = {
    imageList:string[];
}

const width = Dimensions.get("screen").width;

const imageSlider = ({imageList = [] }: Props) => {
  const [paginationIndex, setPaginationsIndex] = useState(0);


  const onViewableItemsChanged = ({
    viewableItems
    } : {
    viewableItems: ViewToken []
    }) => {
    if (
      viewableItems[0].index !== undefined && 
      viewableItems[0].index !== null
    ) { 
      setPaginationsIndex(viewableItems[0].index % imageList.length);
    }
  };

  const viewabilityConfig ={
    itemVisiblePercentThreshold: 50,
  }

  const viewabilityConfigCallbackPairs= useRef ([
    {viewabilityConfig, onViewableItemsChanged},
  ]) 
  return (
    <View>
        <FlatList 
        data={imageList} 
        renderItem={({item}) => (
        <View style={{width: width , justifyContent: "center" , alignItems: "center"}}>
            <Image source = {{uri:item}} style={{width:300, height:300 , borderRadius: 15}}/>    
        </View>)}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        />
        <Pagination items={imageList} paginationIndex={paginationIndex}/>
    </View>
  )
}

export default imageSlider

const styles = StyleSheet.create({})