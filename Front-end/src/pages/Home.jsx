import React from 'react'
import CategoryList from '../components/CategoryList';
import BannerProduct from '../components/BannerProduct';
import HorizontalCardProduct from '../components/HorizontalCardProduct';
import VerticalCardProduct from '../components/VerticalCardProduct';

const Home = () => {
  return (
    <>
      <CategoryList />
      <BannerProduct/>

      <HorizontalCardProduct category={"airpodes"} heading={"top's Airpodes"} />
      <HorizontalCardProduct category={"watches"} heading={" popular's Watches"} />

      <VerticalCardProduct category={"mobiles"} heading={" popular's mobiles"} />
      <VerticalCardProduct category={"mouse"} heading={" popular's mouse"} />
      <VerticalCardProduct category={"earphones"} heading={" popular's Earphpnes"} />
      <VerticalCardProduct category={"televisions"} heading={" popular's TeleVisions"} />
      <VerticalCardProduct category={"trimmers"} heading={" popular's Trimmers"} />

    </>
  )
}

export default Home;
